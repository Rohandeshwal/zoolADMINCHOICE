import { Component, OnInit } from "@angular/core";
import { ButtonRendererComponent } from "src/app/shared/components/renderer/button-renderer/buttonRenderer";
import { Router } from "@angular/router";
import { ContextService } from "src/app/core/services/context.service";
import {
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import { SharedService } from "src/app/core/services/shared.service";
import { DeleteConfirmationComponent } from "src/app/shared/components/delete-confirmation/delete-confirmation.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-context-relation-list",
  templateUrl: "./context-relation-list.component.html",
  styleUrls: ["./context-relation-list.component.scss"],
})
export class ContextRelationListComponent implements OnInit {
  frameworkComponents: any;
  pageSize: number = 5;
  page: number;
  gridAPI: GridApi;
  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: "infinite",
    cacheBlockSize: this.pageSize,
    paginationPageSize: this.pageSize,
  };
  columnDefs = [
    { headerName: "Context Parent", field: "parent", filter: true },
    { headerName: "Context Child", field: "child", filter: true },
    {
      headerName: "Action",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onEdit: this.onEdit.bind(this),
        onDelete: this.onDelete.bind(this),
      },
    },
  ];
  contexts: any;
  searchText: any;
  constructor(
    private router: Router,
    private contextService: ContextService,
    private sharedService: SharedService,
    private modalService: NgbModal
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  rowData: any[] = [];

  ngOnInit() {}

  // on grid ready
  onGridReady(params) {
    this.gridAPI = params.api; // To access the grids API
    this.gridAPI.sizeColumnsToFit();
    this.gridAPI.setDatasource(this.dataSource);
    // this.getContextWithChild();
  }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      console.log("--params--", params);
      this.page = params.endRow / this.pageSize;
      this.getContextWithChild().subscribe((data) => {
        console.log("data---", data);
        this.contexts = data;
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((each) => {
            modifiedData.push({
              parent: each.contextLabels[0].name,
              child: each.childContext.contextLabels[0].name,
              id: each.id,
              childId: each.childId,
            });
          });
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };

  searchDataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      console.log("--params--", params);
      this.page = params.endRow / this.pageSize;
      this.searchContextWithChild().subscribe((data) => {
        console.log("data---", data);
        this.contexts = data;
        let modifiedData = [];
        if (data && data.content && data.content.length) {
          data.content.forEach((each) => {
            modifiedData.push({
              parent: each.contextLabels[0].name,
              child: each.childContext.contextLabels[0].name,
              id: each.id,
              childId: each.childId,
            });
          });
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };

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

  searchContextWithChild() {
    return this.contextService.searchContextWithChild(
      this.searchText,
      this.page,
      this.pageSize
    );
  }

  onEdit(data?) {
    console.log("---data--", data);
    this.router.navigate([
      "manage/context-relationship/edit/" + data.rowData.id,
    ]);
  }
  onDelete(data?) {
    console.log("on delete value", data);
    console.log("--context--", this.contexts);
    let selectedContext = this.contexts.content.filter(
      (each) => each.id == data.rowData.id
    )[0];
    if (selectedContext) {
      let deleteModal = this.modalService.open(DeleteConfirmationComponent, {});
      deleteModal.componentInstance.status.subscribe((res) => {
        console.log("--delete modal--", res);
        if (res) {
          let childContext = JSON.parse(
            JSON.stringify(selectedContext.childContext)
          );
          console.log("--parent context--", selectedContext);
          console.log("--child context--", childContext);
          delete selectedContext.childContext;
          delete selectedContext.childId;
          this.getChildValues(selectedContext, childContext);
        }
      });
    }
  }

  getChildValues(selectedContext, childContext) {
    this.contextService
      .getContextValueById(childContext.id, 0, 0)
      .toPromise()
      .then((res) => {
        console.log("values--", res);
        if (res && !res.status) {
          childContext.contextValues = res.content;
          childContext.contextValues.forEach((each) => {
            delete each.parentId;
          });
          console.log("--parent context--", selectedContext);
          console.log("--child context--", childContext);
          this.deleteRelation(selectedContext, childContext);
        }
        else{
          console.error("--error while getting child value--", res);
          this.sharedService.showError(
            "Error while deleting context relationship"
          );
        }

      })
      .catch((err) => {
        console.error("--error while getting child value--", err);
        this.sharedService.showError(
          "Error while deleting context relationship"
        );
      });
  }

  deleteRelation(parent, child) {
    let allRequests = [];

    allRequests.push(this.contextService.updateContext(child).toPromise());
    allRequests.push(this.contextService.updateContext(parent).toPromise());
    Promise.all(allRequests)
      .then((res) => {
        let success = res.every((each) => each && !each.status);
        if (res && res.length && success) {
          console.log("--deleted successfully--", res);
          this.gridAPI.setDatasource(this.dataSource);
          // this.router.navigate(["/manage/context-relationship"]);
          this.sharedService.showSuccess(
            "Context relationship deleted successfully"
          );
        } else {
          console.error("--error while deleting--", res);
          this.gridAPI.setDatasource(this.dataSource);
          // this.router.navigate(["/manage/context-relationship"]);
          this.sharedService.showError(
            "Error while deleting relationship, please try again later"
          );
        }
      })
      .catch((err) => {
        console.error("--error while deleting--", err);
        this.gridAPI.setDatasource(this.dataSource);
        // this.router.navigate(["/manage/context-relationship"]);
        this.sharedService.showError(
          "Error while deleting relationship, please try again later"
        );
      });
  }

  getContextWithChild() {
    return this.contextService.getContextWithChild(this.page, this.pageSize);
  }
}
