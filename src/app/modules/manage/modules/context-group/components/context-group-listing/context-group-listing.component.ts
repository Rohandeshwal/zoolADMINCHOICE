import { Component, OnInit } from "@angular/core";
import { ButtonRendererComponent } from "src/app/shared/components/renderer/button-renderer/buttonRenderer";
import { Router } from "@angular/router";
import { SharedService } from "src/app/core/services/shared.service";
import { ModuleService } from "src/app/core/services/modules.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteConfirmationComponent } from "src/app/shared/components/delete-confirmation/delete-confirmation.component";
import {
  GridOptions,
  GridApi,
  IGetRowsParams,
  IDatasource,
} from "ag-grid-community";
import { ContextService } from "src/app/core/services/context.service";

@Component({
  selector: "app-context-group-listing",
  templateUrl: "./context-group-listing.component.html",
  styleUrls: ["./context-group-listing.component.scss"],
})
export class ContextGroupListingComponent implements OnInit {
  searchText: string;
  pageNumber: number;
  pageSize: number = 5;
  frameworkComponents: any;
  columnDefs = [
    { headerName: "Context Group Name", field: "name", filter: true },
    {
      headerName: "Action",
      pinned: "right",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onEdit: this.onEdit.bind(this),
        onDelete: this.onDelete.bind(this),
      },
    },
  ];
  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: "infinite",
    cacheBlockSize: this.pageSize,
    paginationPageSize: this.pageSize,
  };
  gridAPI: GridApi;
  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private contextService: ContextService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }
  // on grid ready
  onGridReady(params) {
    this.gridAPI = params.api; // To access the grids API
    this.gridAPI.sizeColumnsToFit();
    this.gridAPI.setDatasource(this.dataSource);
  }

  ngOnInit(): void {}
  // display desc as HTML
  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      console.log("---params--", params);
      this.pageNumber = params.endRow / this.pageSize;
      this.getAllContextGroups().subscribe((data) => {
        console.log("---all groups-->", data);
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              name: element.name,
              id: element.id,
            });
          });
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };

  searchDataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      console.log("---params--", params);
      this.pageNumber = params.endRow / this.pageSize;
      this.searchContextGroupName().subscribe((data) => {
        console.log("---all groups-->", data);
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              name: element.name,
              id: element.id,
            });
          });
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };

  setDataForSearchContextGroup() {
    if (this.searchText) {
      this.gridAPI.setDatasource(this.searchDataSource);
    } else {
      this.gridAPI.setDatasource(this.dataSource);
    }
  }

  getAllContextGroups() {
    return this.contextService.getAllContextGroups(
      this.pageNumber,
      this.pageSize
    );
  }

  searchContextGroupName() {
    return this.contextService.searchContextGroupName(
      this.pageNumber,
      this.pageSize,
      this.searchText
    );
  }

  displayAsHTML(params) {
    return params.value ? params.value : "";
  }
  onEdit(data) {
    if (data && data.rowData) {
      this.router.navigate(["manage/context-group/edit/" + data.rowData.id]);
    }
  }
  onDelete(data) {
    if (data && data.rowData && data.rowData.id) {
      let deleteModal = this.modalService.open(DeleteConfirmationComponent, {});
      deleteModal.componentInstance.status.subscribe((res) => {
        console.log('--delete modal--',res);
        if(res){
          this.contextService.deleteContextGroup(data.rowData.id).subscribe(
            (res) => {
              console.log("---delete response--", res);
              if (res && res.status) {
                this.sharedService.showError("Error while deleting context group");
              } else {
                this.sharedService.showSuccess(
                  "Context group deleted successfully"
                );
                this.gridAPI.setDatasource(this.dataSource);
              }
            },
            (err) => {
              console.error("--error response--", err);
              this.sharedService.showError("Error while deleting context group");
            }
          );
        }
      });
     
    }
  }

  resetSearch() {
    this.searchText = null;
    this.setDataForSearchContextGroup();
  }
}
