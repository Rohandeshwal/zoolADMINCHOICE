import { Component, OnInit } from "@angular/core";
import { ButtonRendererComponent } from "src/app/shared/components/renderer/button-renderer/buttonRenderer";
import { Router } from "@angular/router";
import { SharedService } from "src/app/core/services/shared.service";
import { ModuleService } from "src/app/core/services/modules.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteConfirmationComponent } from "src/app/shared/components/delete-confirmation/delete-confirmation.component";
import { DescriptionModalComponent } from "src/app/shared/components/description-modal/description-modal.component";
import { SocialMediaButtonRendererComponent } from "src/app/shared/components/renderer/social-media-buttons/social-media-buttons";

import {
  GridOptions,
  GridApi,
  IGetRowsParams,
  IDatasource,
} from "ag-grid-community";
import { BusinessRelationService } from "src/app/core/services/business-relation.service";

@Component({
  selector: "app-business-relation-group-listing",
  templateUrl: "./business-relation-group-listing.component.html",
  styleUrls: ["./business-relation-group-listing.component.scss"],
})
export class BusinessRelationGroupListingComponent implements OnInit {
  frameworkComponents: any;
  pageNumber: number;
  pageSize: number = 5;
  relationType: any;
  columnDefs = [
    { headerName: "Business Relation Group Name", field: "name", filter: true },
    {
      headerName: "Description",
      cellRenderer: "socialMediaButtons",
      cellRendererParams: {
        onOpen: this.onOpen.bind(this),
      },
    },
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
    private modalService: NgbModal,
    private sharedService: SharedService,
    private businessRelationService: BusinessRelationService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      socialMediaButtons: SocialMediaButtonRendererComponent,
    };
  }
  ngOnInit(): void { }
  //open description modal
  onOpen() {
    let openDescription = this.modalService.open(DescriptionModalComponent, {});
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
      this.pageNumber = params.endRow / this.pageSize;
      this.getAllBusinessRelationData().subscribe((data) => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              version: element.version,
              businessGroupId: element.id,
              name: element.relationLabels[0].name,
            });
          });
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };
  // get all Business Components data
  getAllBusinessRelationData() {
    return this.businessRelationService.getAllRelationType(
      this.pageNumber,
      this.pageSize
    );
  }

  // on edit the Business Components
  onEdit(data?) {
    if (data && data.rowData && data.rowData.businessGroupId) {
      this.router.navigate([
        "manage/business-relations-group/edit/",
        data.rowData.businessGroupId,
      ]);
    }
  }
  // on call delete function
  onDelete(data?) {
    if (data && data.rowData && data.rowData.businessGroupId) {
      let deleteModel = this.modalService.open(DeleteConfirmationComponent, {});
      deleteModel.componentInstance.status.subscribe((res) => {
        this.deleteBusinessRelation(res, data.rowData.businessGroupId);
      });
    }
  }
  // delete  Business Component
  deleteBusinessRelation(status, businessGroupId) {
    if (status === true) {
      this.businessRelationService
        .deleteRelationType(businessGroupId)
        .subscribe(
          (res) => {
            if (res) {
              this.sharedService.showError(
                "Error while deleting Business Relation"
              );
            } else {
              this.sharedService.showSuccess(
                "Business Relation deleted successfully"
              );
              this.gridAPI.setDatasource(this.dataSource);
            }
          },
          (err) => {
            this.sharedService.showError(
              "Error while deleting Business Relation"
            );
          }
        );
    }
  }

  // display desc as HTML
  displayAsHTML(params) {
    return params.value ? params.value : "";
  }

  getSearchRelation() {
    return this.businessRelationService.searchRelationType(this.relationType);
  }
  searchRelationType() {
    if (this.relationType) {
      this.gridAPI.setDatasource(this.searchDataSource);
    } else {
      this.gridAPI.setDatasource(this.dataSource);
    }
  }

  clearSearch() {
    this.relationType = "";
    this.gridAPI.setDatasource(this.dataSource);
  }

  // set data to the table
  searchDataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.pageNumber = params.endRow / this.pageSize;
      this.getSearchRelation().subscribe((data) => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              version: element.version,
              businessGroupId: element.id,
              name: element.relationLabels[0].name,
            });
          });
        } else {
          this.sharedService.showInfo("No data found");
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };
}
