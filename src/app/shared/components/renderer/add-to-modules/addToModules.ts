// Author: T4professor
import { Component, Output, EventEmitter } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

// Third Party Ag-Grid Component
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

// Entry Component
import {DeleteConfirmationComponent} from '../../delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-add-to-modules-renderer',
  templateUrl: './addToModules.html',
    styleUrls: ['./addToModules.scss']
})

export class AddToModulesComponent implements ICellRendererAngularComp {
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

  onAddToModules($event) {
    if (this.params.onAddToModules instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onAddToModules(params);
    }
  }


}