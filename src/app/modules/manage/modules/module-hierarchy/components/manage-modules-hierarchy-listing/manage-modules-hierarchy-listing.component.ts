import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer/buttonRenderer';
import { ModuleService } from 'src/app/core/services/modules.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/core/services/shared.service';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { GridOptions, GridApi, IGetRowsParams, IDatasource } from 'ag-grid-community';

@Component({
  selector: 'app-manage-obj-hierachy',
  templateUrl: './manage-modules-hierarchy-listing.component.html',
  styleUrls: ['./manage-modules-hierarchy-listing.component.scss']
})
export class ManageModulesHierarchyListingComponent implements OnInit {
  frameworkComponents: any;
  gridApi: any;
  rowData = []


  columnDefs = [
    {
      headerName: 'Icon', field: 'icon',
      cellRenderer: this.displayLogo
    },
    { headerName: 'Modules Name', field: 'name', filter: true },
    {
      headerName: 'Action', pinned: 'right', lockPinned: true,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onEdit: this.onEdit.bind(this),
        onDelete: this.onDelete.bind(this),
      }
    }
  ];


  pageNumber: number = 1;
  pageSize: number = 5;
  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: 'infinite',
    cacheBlockSize: this.pageSize,
    paginationPageSize: this.pageSize
  };
  gridAPI: GridApi;
  moduleHierarchyName: string;
  constructor(private moduleService: ModuleService, private modalService: NgbModal,
    private sharedService: SharedService,
    private router: Router,) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  ngOnInit() {
  }

  // on grid ready 
  onGridReady(params) {
    this.gridAPI = params.api; // To access the grids API
    this.gridAPI.sizeColumnsToFit();
    this.gridAPI.setDatasource(this.dataSource);
  }


  // set data to the table 
  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.pageNumber = (params.endRow / this.pageSize);
      this.getHierarchies().subscribe(data => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            // debugger
            modifiedData.push({
              icon: element.hierarchyRelations[0].modules[0].images[0].image,
              hierarchyId: element.id,
              name: element.hierarchyRelations[0].modules[0].moduleLabels[0].name,
            });
          });
        }
        params.successCallback(
          modifiedData,
          data.totalElements
        );
      })
    }
  }

  // display desc as HTML
  displayAsHTML(params) {
    return params.value ? params.value : "";
  }

  // display logo
  displayLogo(params) {
    return `<img  style="width:30px !important"  src="${params.value}">`
  }

  // get all Business Components data
  getHierarchies() {
    return this.moduleService.getHierarchies(this.pageNumber, this.pageSize);
  }



  onEdit(data?) {
    if (data && data.rowData && data.rowData.hierarchyId) {
      this.router.navigate(["manage/module-hierarchy/edit/", data.rowData.hierarchyId]);
    }
  }



  onDelete(data?) {
    if (data && data.rowData && data.rowData.hierarchyId) {
      let deleteModel = this.modalService.open(DeleteConfirmationComponent, {});
      deleteModel.componentInstance.status.subscribe(res => {
        this.deleteHierarchy(res, data.rowData.hierarchyId)
      });
    }
  }

  deleteHierarchy(status, hierarchyId) {
    if (status === true) {
      this.moduleService.deleteHierarchy(hierarchyId).subscribe(res => {
        if (res) {
          this.sharedService.showError("Error while deleting hierarchy");
        } else {
          this.sharedService.showSuccess("Hierarchy deleted successfully");
          this.gridAPI.setDatasource(this.dataSource);
        }
      },
        (err) => {
          this.sharedService.showError("Error while deleting hierarchy");
        }
      )
    }
  }
  searchModuleHierarchyName() {
    if (this.moduleHierarchyName) {
      this.gridAPI.setDatasource(this.searchDataSource);
    } else {
      this.gridAPI.setDatasource(this.dataSource);
    }
  }

  clearSearch() {
    this.moduleHierarchyName = '';
    this.gridAPI.setDatasource(this.dataSource);
  }

  // get Search Hierarchy
  getSearchHierarchy() {
    return this.moduleService.searchHierarchies(this.moduleHierarchyName);
  }

  // set data to the table 
  searchDataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.pageNumber = (params.endRow / this.pageSize);
      this.getSearchHierarchy().subscribe(data => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              icon: 'ico-file-format.svg',
              hierarchyId: element.id,
              name: element.hierarchyRelations[0].modules[0].moduleLabels[0].name,
            });
          });
        } else {
          this.sharedService.showInfo("No data found");
        }
        params.successCallback(
          modifiedData,
          data.totalElements
        );
      }, (err => {
        this.sharedService.showInfo("No data found");
      }))
    }
  }
}
