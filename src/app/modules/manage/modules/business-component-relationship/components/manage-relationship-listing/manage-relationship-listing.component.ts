import { Component, OnInit } from "@angular/core";
import { ButtonRendererComponent } from "src/app/shared/components/renderer/button-renderer/buttonRenderer";
import { DescriptionModalComponent } from "src/app/shared/components/description-modal/description-modal.component";
import { SharedService } from "src/app/core/services/shared.service";
import { SocialMediaButtonRendererComponent } from "src/app/shared/components/renderer/social-media-buttons/social-media-buttons";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Router } from "@angular/router";
import { GridOptions, GridApi, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { BusinessRelationService } from 'src/app/core/services/business-relation.service';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: "app-manage-relationship-listing",
  templateUrl: "./manage-relationship-listing.component.html",
  styleUrls: ["./manage-relationship-listing.component.scss"],
})
export class ManageRelationshipListingComponent implements OnInit {
  show = false;
  isCollapsed = false;
  frameworkComponents: any;

  pageNumber: number;
  pageSize: number = 5;
  businessCompName: any;

  columnDefs = [
    {
      headerName: "Relationship between",
      children: [
        {
          headerName: "Business Component",
          field: "componentOne",
          filter: true,
        },
        {
          headerName: "Business Component",
          field: "componentSecond",
          filter: true
        },
      ],
    },
    {
      headerName: "Relationship Type",
      field: "relation",
      filter: true
    },
    {
      headerName: "Description",
      cellRenderer: "socialMediaButtons",
      cellRendererParams: {
        onOpen: this.onOpen.bind(this),
      },
    },
    {
      headerName: "Action",
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
    private modalService: NgbModal,
    private sharedService: SharedService,
    private businessRelationService: BusinessRelationService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      socialMediaButtons: SocialMediaButtonRendererComponent,
    };
  }


  ngOnInit() { }


  // on grid ready
  onGridReady(params) {
    this.gridAPI = params.api; // To access the grids API
    this.gridAPI.sizeColumnsToFit();
    this.gridAPI.setDatasource(this.dataSource);
  }

  // set data to the table
  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.pageNumber = params.endRow / this.pageSize;
      this.getAllBusinessRelation().subscribe((data) => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          modifiedData = this.getRelationTableMappedData(data.content)
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };
  // Relation Table Mapped Data
  getRelationTableMappedData(data) {
    let modifiedData = [];
    data.forEach((element) => {
      modifiedData.push({
        componentOne: this.getBusinessComponentData(element.businessComponents[0]),
        componentSecond: this.getBusinessComponentData(element.businessComponentRelations[0].businessComponents[0]),
        relation: this.getBusinessRelation(element.businessComponentRelations[0].relationType),
        businessComponentRelationId: element.id,
        version: element.version
      });
    });
    console.log(modifiedData)
    return modifiedData
  }
  // business component name for mapping 
  getBusinessComponentData(data) {
    let name;
    if (data && data.businessComponentLabels) {
      name = data.businessComponentLabels[0].name;
    }
    return name;
  }
  getBusinessRelation(data) {
    console.log(data)
    let name;
    if (data && data.relationLabels) {
      name = data.relationLabels[0].name;
    }
    return name;
  }

  // get all Business Relation data
  getAllBusinessRelation() {
    return this.businessRelationService.getAllBusinessRelation(
      this.pageNumber,
      this.pageSize
    );
  }


  // search
  searchBusinessRelation() {
    return this.businessRelationService.searchBusinessRelation(this.businessCompName);
  }
  // on clear
  clearSearch() {
    this.businessCompName = "";
    this.gridAPI.setDatasource(this.dataSource);
  }


  searchBusinessComponent() {
    if (this.businessCompName) {
      this.gridAPI.setDatasource(this.searchDataSource);
    } else {
      this.gridAPI.setDatasource(this.dataSource);
    }
  }

  // set data to the table
  searchDataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.pageNumber = params.endRow / this.pageSize;
      this.searchBusinessRelation().subscribe((data) => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          modifiedData = this.getRelationTableMappedData(data.content)
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };





  onOpen() {
    let openDescription = this.modalService.open(DescriptionModalComponent, {});
  }
  onEdit(data?) {
    if (data && data.rowData && data.rowData.businessComponentRelationId) {
      this.router.navigate([
        "manage/business-component-relationship/edit",
        data.rowData.businessComponentRelationId,
      ]);
    }
  }
  // on call delete function
  onDelete(data?) {
    if (data && data.rowData && data.rowData.businessComponentRelationId) {
      let deleteModel = this.modalService.open(DeleteConfirmationComponent, {});
      deleteModel.componentInstance.status.subscribe((res) => {
        this.deleteBusinessComponent(res, data.rowData.businessComponentRelationId);
      });
    }
  }
  // delete  Business Component
  deleteBusinessComponent(status, businessComponentRelationId) {
    if (status === true) {
      this.businessRelationService
        .deleteBusinessRelation(businessComponentRelationId)
        .subscribe(
          (res) => {
            if (res) {
              this.sharedService.showError(
                "Error while deleting Business Component Relation"
              );
            } else {
              this.sharedService.showSuccess(
                "Business Component Relation deleted successfully"
              );
              this.gridAPI.setDatasource(this.dataSource);
            }
          },
          (err) => {
            this.sharedService.showError(
              "Error while deleting Business Components Relation"
            );
          }
        );
    }
  }
}
