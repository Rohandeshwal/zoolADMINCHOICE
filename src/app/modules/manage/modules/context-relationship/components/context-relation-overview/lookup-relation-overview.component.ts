import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';
import { GridApi } from 'ag-grid-community';
import { ButtonRendererComponent } from "src/app/shared/components/renderer/button-renderer/buttonRenderer";

@Component({
  selector: "app-context-relation-overview",
  templateUrl: "./context-relation-overview.component.html",
  styleUrls: ["./context-relation-overview.component.scss"],
})
export class ContextRelationOverviewComponent implements OnInit {
  frameworkComponents: any
  gridAPI:GridApi;
  columnDefs = [
  
    { headerName: 'Context ', field: 'name', filter: true },
    { headerName: 'Value', field: 'value', filter: true },
    {headerName:'Action', pinned:'right',lockPinned:true, cellRenderer: "buttonRenderer",
    cellRendererParams: {
      onEdit: this.onEdit.bind(this),
      onDelete: this.onDelete.bind(this),
    },}
  ]
  rowData= [{name:'APAC',value:'India,China,Japan,Singapore,India,China,Japan,Singapore,India,China,Japan,Singapore,India,China,Japan,Singapore'}];
  constructor(  private sharedService: SharedService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
   }

  ngOnInit(): void {
  }
  onGridReady(params){
    console.log('---event--',params);
    this.gridAPI = params.api;
    this.gridAPI.setRowData(this.rowData);
  }
  onEdit(data?) {
    console.log('call edit with',data);
    // if (data && data.rowData) {
    //   this.router.navigate(["manage/context/edit/" + data.rowData.id]);
    // }
  }

  onDelete(data?) {
    console.log('delete this',data);
    // if (data && data.rowData && data.rowData.id) {
    //   this.contextService.deleteContext(data.rowData.id).subscribe(
    //     (res) => {
    //       if (res) {
    //         this.sharedService.showError("Error while deleting context");
    //       } else {
    //         this.sharedService.showSuccess("Context deleted successfully");
    //         this.gridAPI.setDatasource(this.dataSource);
    //       }
    //     },
    //     (err) => {
    //       this.sharedService.showError("Error while deleting context");
    //     }
    //   );
    // }
  }

}
