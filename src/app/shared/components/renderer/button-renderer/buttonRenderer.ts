// Author: T4professor
import { Component, Output, EventEmitter } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

// Third Party Ag-Grid Component
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

// Entry Component
import {DeleteConfirmationComponent} from './../../delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-button-renderer',
  templateUrl: './buttonRenderer.html',
    styleUrls: ['./buttonRenderer.scss']
})

export class ButtonRendererComponent implements ICellRendererAngularComp {
  params;
  label: string;

  constructor(
    private modalService: NgbModal
  ){

  }

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onEdit($event) {
    if (this.params.onEdit instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onEdit(params);
    }
  }

  onDelete($event){
    // this.modalService.open(DeleteConfirmationComponent,{})
    if (this.params.onDelete instanceof Function) {
        // put anything into params u want pass into parents component
        const params = {
          event: $event,
          rowData: this.params.node.data
          // ...something
        }
        this.params.onDelete(params);
      }
  }
}