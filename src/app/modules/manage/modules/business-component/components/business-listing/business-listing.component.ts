import { Component, OnInit } from "@angular/core";
import { ButtonRendererComponent } from "src/app/shared/components/renderer/button-renderer/buttonRenderer";
import { AddToModulesComponent } from "src/app/shared/components/renderer/add-to-modules/addToModules";
import { Router } from "@angular/router";
import { BusinessService } from "src/app/core/services/business.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteConfirmationComponent } from "src/app/shared/components/delete-confirmation/delete-confirmation.component";
import { SharedService } from "src/app/core/services/shared.service";
import {
  GridOptions,
  GridApi,
  IGetRowsParams,
  IDatasource,
} from "ag-grid-community";
import { DescriptionModalComponent } from "src/app/shared/components/description-modal/description-modal.component";
import { SocialMediaButtonRendererComponent } from "src/app/shared/components/renderer/social-media-buttons/social-media-buttons";

@Component({
  selector: "app-business-listing",
  templateUrl: "./business-listing.component.html",
  styleUrls: ["./business-listing.component.scss"],
})
export class BusinessListingComponent implements OnInit {
  show = false;

  frameworkComponents: any;
  isCollapsed = false;
  rowData: any[] = [];
  gridApi: any;

  pageNumber: number;
  pageSize: number = 5;

  businessCompName: any;
  columnDefs = [
    {
      headerName: "Icon",
      field: "icon",
      cellRenderer: this.displayLogo,
    },

    { headerName: "Business Component Name", field: "name", filter: true },
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
      lockPinned: true,
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onEdit: this.onEdit.bind(this),
        onDelete: this.onDelete.bind(this),
      },
    },
    {
      headerName: "Attach to Module",
      field: "Module name",
      filter: true,
      cellRenderer: "addToModules",
      cellRendererParams: {
        onAddToModules: this.onAddToModules.bind(this),
      },
    },
  ];

  allBusinessComponentsData: any;

  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: "infinite",
    cacheBlockSize: this.pageSize,
    paginationPageSize: this.pageSize,
  };
  gridAPI: GridApi;
  constructor(
    private router: Router,
    private businessService: BusinessService,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      addToModules: AddToModulesComponent,
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
      this.getAllBusinessComponents().subscribe((data) => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              icon:
                element && element.images && element.images.length
                  ? element.images[0].image
                  : "ico-file-format.svg",
              version: element.version,
              businessComponentId: element.id,
              name: element.businessComponentLabels[0].name,
              description: "",
              // description: element.entityDescriptions[0].name
            });
          });
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };

  // display desc as HTML
  displayAsHTML(params) {
    return params.value ? params.value : "";
  }

  // display logo
  displayLogo(params) {
    return `<img  style="width:30px !important"  src="${params.value}">`;
  }

  // get all Business Components data
  getAllBusinessComponents() {
    return this.businessService.getAllBusinessComponents(
      this.pageNumber,
      this.pageSize
    );
  }
  // on click on view description 
  onOpen(data?) {
    if (data && data.rowData) {
      this.businessService.getBusinessComponentsDescription(data.rowData.businessComponentId).subscribe(
        (res) => {
          if (res && res.name) {
            this.onDescModalOpen(res.name);
          } else {
            this.sharedService.showError("while fetching description");
          }
        },
        (err) => {
          this.sharedService.showError("while fetching description");
        }
      );
    }
  }

  onDescModalOpen(description) {
    let descModal = this.modalService.open(DescriptionModalComponent, {});
    descModal.componentInstance.descData = description;
    descModal.componentInstance.status.subscribe((res) => {

    });
  }

  // on edit the Business Components
  onEdit(data?) {
    if (data && data.rowData && data.rowData.businessComponentId) {
      this.router.navigate([
        "manage/business-component/edit/",
        data.rowData.businessComponentId,
      ]);
    }
  }
  // on call delete function
  onDelete(data?) {
    if (data && data.rowData && data.rowData.businessComponentId) {
      let deleteModel = this.modalService.open(DeleteConfirmationComponent, {});
      deleteModel.componentInstance.status.subscribe((res) => {
        this.deleteBusinessComponent(res, data.rowData.businessComponentId);
      });
    }
  }
  // delete  Business Component
  deleteBusinessComponent(status, businessComponentId) {
    if (status === true) {
      this.businessService
        .deleteBusinessComponent(businessComponentId)
        .subscribe(
          (res) => {
            if (res) {
              this.sharedService.showError(
                "Error while deleting Business Component"
              );
            } else {
              this.sharedService.showSuccess(
                "Business Component deleted successfully"
              );
              this.gridAPI.setDatasource(this.dataSource);
            }
          },
          (err) => {
            this.sharedService.showError(
              "Error while deleting Business Components"
            );
          }
        );
    }
  }

  onAddToModules(data?) {
    if (data && data.rowData && data.rowData.businessComponentId) {
      this.router.navigate(["manage/business-component/addToModules"], {
        queryParams: {
          version: data.rowData.version,
          busComId: data.rowData.businessComponentId,
        },
      });
    }
  }

  // get all modules data
  getSearchBusinessCompName() {
    return this.businessService.searchBusinessComponent(this.businessCompName);
  }

  searchBusinessComponent() {
    if (this.businessCompName) {
      this.gridAPI.setDatasource(this.searchDataSource);
    } else {
      this.gridAPI.setDatasource(this.dataSource);
    }
  }

  clearSearch() {
    this.businessCompName = "";
    this.gridAPI.setDatasource(this.dataSource);
  }

  // set data to the table
  searchDataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.pageNumber = params.endRow / this.pageSize;
      this.getSearchBusinessCompName().subscribe((data) => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              icon:
                element && element.images && element.images.length
                  ? element.images[0].image
                  : "ico-file-format.svg",
              version: element.version,
              businessComponentId: element.id,
              name: element.businessComponentLabels[0].name,
              description: "",
              // description: element.entityDescriptions[0].name
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
