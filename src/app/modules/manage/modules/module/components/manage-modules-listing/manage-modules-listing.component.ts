import { Component, OnInit } from "@angular/core";
import { ButtonRendererComponent } from "src/app/shared/components/renderer/button-renderer/buttonRenderer";
import { SocialMediaButtonRendererComponent } from "src/app/shared/components/renderer/social-media-buttons/social-media-buttons";
import { Router } from "@angular/router";
import { SharedService } from "src/app/core/services/shared.service";
import { ModuleService } from "src/app/core/services/modules.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteConfirmationComponent } from "src/app/shared/components/delete-confirmation/delete-confirmation.component";
import { DescriptionModalComponent } from "src/app/shared/components/description-modal/description-modal.component";

import {
  GridOptions,
  GridApi,
  IGetRowsParams,
  IDatasource,
} from "ag-grid-community";

@Component({
  selector: "app-manage-modules-listing",
  templateUrl: "./manage-modules-listing.component.html",
  styleUrls: ["./manage-modules-listing.component.scss"],
})
export class ManageModulesListingComponent implements OnInit {
  frameworkComponents: any;
  gridApi: any;
  show = false;
  isCollapsed = false;
  image: string;
  moduleName: any;
  pageNumber: number;
  pageSize: number = 5;

  columnDefs = [
    {
      headerName: "Icon",
      field: "icon",
      cellRenderer: this.displayLogo,
    },
    { headerName: "Modules Name", field: "name", filter: true },
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
  allModuleData: any[] = [];
  rowData: any[] = [];

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      socialMediaButtons: SocialMediaButtonRendererComponent,
    };
  }

  ngOnInit() {}

  // on grid ready
  onGridReady(params) {
    this.gridAPI = params.api; // To access the grids API
    this.gridAPI.sizeColumnsToFit();
    this.gridAPI.setDatasource(this.dataSource);
  }

  // set data to the table
  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      // debugger;
      this.pageNumber = params.endRow / this.pageSize;
      this.getAllModules().subscribe((data) => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              icon:
                element && element.images && element.images.length
                  ? element.images[0].image
                  : "ico-file-format.svg",
              moduleId: element.id,
              name: element.moduleLabels[0].name,
              // description: element.entityDescriptions[0].name,
              description: "",
            });
          });
        } else {
          this.sharedService.showInfo("No modules data found");
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

  // get all modules data
  getAllModules() {
    return this.moduleService.getAllModule(this.pageNumber, this.pageSize);
  }

  // on click on view description
  onOpen(data?) {
    if (data && data.rowData) {
      this.moduleService.getModuleDescription(data.rowData.moduleId).subscribe(
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
    let descModal = this.modalService.open(DescriptionModalComponent, {
      size: "lg",
    });
    descModal.componentInstance.descData = description;
    descModal.componentInstance.status.subscribe((res) => {});
  }
  // on edit the module
  onEdit(data?) {
    if (data && data.rowData) {
      this.router.navigate(["manage/module/edit/", data.rowData.moduleId]);
    }
  }
  // on call delete function
  onDelete(data?) {
    if (data && data.rowData && data.rowData.moduleId) {
      let deleteModel = this.modalService.open(DeleteConfirmationComponent, {});
      deleteModel.componentInstance.status.subscribe((res) => {
        this.deleteModule(res, data.rowData.moduleId);
      });
    }
  }
  // delete  module
  deleteModule(status, moduleId) {
    if (status === true) {
      this.moduleService.deleteModule(moduleId).subscribe(
        (res) => {
          if (res) {
            this.sharedService.showError("Error while deleting module");
          } else {
            this.sharedService.showSuccess("Module deleted successfully");
            this.gridAPI.setDatasource(this.dataSource);
          }
        },
        (err) => {
          this.sharedService.showError("Error while deleting module");
        }
      );
    }
  }
  // get all modules data
  getSearchModule() {
    return this.moduleService.searchModule(this.moduleName);
  }

  // Todo  for work
  searchModule() {
    if (this.moduleName) {
      this.gridAPI.setDatasource(this.searchDataSource);
    } else {
      this.gridAPI.setDatasource(this.dataSource);
    }
  }

  clearSearch() {
    this.moduleName = "";
    this.gridAPI.setDatasource(this.dataSource);
  }

  // set data to the table
  searchDataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.pageNumber = params.endRow / this.pageSize;
      this.getSearchModule().subscribe((data) => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              icon:
                element && element.images && element.images.length
                  ? element.images[0].image
                  : "ico-file-format.svg",
              moduleId: element.id,
              name: element.moduleLabels[0].name,
              // description: element.entityDescriptions[0].name,
              description: "",
            });
          });
        } else {
          this.sharedService.showInfo("No modules data found");
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };
}
