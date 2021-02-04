import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonRendererComponent } from "src/app/shared/components/renderer/button-renderer/buttonRenderer";
import { ContextService } from "src/app/core/services/context.service";
import { SharedService } from "src/app/core/services/shared.service";
import {
  GridOptions,
  GridApi,
  IGetRowsParams,
  IDatasource,
} from "ag-grid-community";
import { DescriptionModalComponent } from "src/app/shared/components/description-modal/description-modal.component";

import { SocialMediaButtonRendererComponent } from "src/app/shared/components/renderer/social-media-buttons/social-media-buttons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteConfirmationComponent } from "src/app/shared/components/delete-confirmation/delete-confirmation.component";

@Component({
  selector: "app-context-list",
  templateUrl: "./context-list.component.html",
  styleUrls: ["./context-list.component.scss"],
})
export class ContextListComponent implements OnInit {
  pageNumber: number;
  pageSize: number = 5;
  frameworkComponents: any;
  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: "infinite",
    cacheBlockSize: this.pageSize,
    paginationPageSize: this.pageSize,
  };
  gridAPI: GridApi;

  columnDefs = [
    { headerName: "Context Name", field: "name", filter: true },
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
  ];
  searchText: any;
  constructor(
    private contextService: ContextService,
    private router: Router,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      socialMediaButtons: SocialMediaButtonRendererComponent,
    };
  }

  ngOnInit() {}
  onOpen() {
    let openDescription = this.modalService.open(DescriptionModalComponent, {});
  }
  // on grid ready
  onGridReady(params) {
    this.gridAPI = params.api; // To access the grids API
    this.gridAPI.sizeColumnsToFit();
    this.gridAPI.setDatasource(this.dataSource);
  }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.pageNumber = params.endRow / this.pageSize;
      this.getAllContext().subscribe((data) => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              name: element.contextLabels[0].name,
              description:
                element &&
                element.entityDescriptions &&
                element.entityDescriptions.length
                  ? element.entityDescriptions[0].name
                  : "",
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
      this.pageNumber = params.endRow / this.pageSize;
      this.searchContext().subscribe((data) => {
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((element) => {
            modifiedData.push({
              name: element.contextLabels[0].name,
              description:
                element &&
                element.entityDescriptions &&
                element.entityDescriptions.length
                  ? element.entityDescriptions[0].name
                  : "",
              id: element.id,
            });
          });
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };

  displayAsHTML(params) {
    return params.value ? params.value : "";
  }

  // get all context data
  getAllContext() {
    return this.contextService.getAllContext(this.pageNumber, this.pageSize);
  }

  searchContext() {
    return this.contextService.searchContext(
      this.pageNumber,
      this.pageSize,
      this.searchText
    );
  }

  setDataForSearchContext() {
    if (this.searchText) {
      this.gridAPI.setDatasource(this.searchDataSource);
    } else {
      this.gridAPI.setDatasource(this.dataSource);
    }
  }

  resetSearch() {
    this.searchText = null;
    this.setDataForSearchContext();
  }

  onEdit(data?) {
    if (data && data.rowData) {
      this.router.navigate(["manage/context/edit/" + data.rowData.id]);
    }
  }

  onDelete(data?) {
    if (data && data.rowData && data.rowData.id) {
      let deleteModal = this.modalService.open(DeleteConfirmationComponent, {});
      deleteModal.componentInstance.status.subscribe((res) => {
        console.log("--delete modal--", res);
        if (res) {
          this.contextService.deleteContext(data.rowData.id).subscribe(
            (res) => {
              if (res) {
                this.sharedService.showError("Error while deleting context");
              } else {
                this.sharedService.showSuccess("Context deleted successfully");
                this.gridAPI.setDatasource(this.dataSource);
              }
            },
            (err) => {
              this.sharedService.showError("Error while deleting context");
            }
          );
        }
      });
    }
  }
}
