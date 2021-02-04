// Author: T4professor

import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "ag-grid-community";

@Component({
  selector: "app-socialMediaButton-renderer",
  templateUrl: "./social-media-buttons.html",
  styleUrls: ["./social-media-buttons.scss"],
})
export class SocialMediaButtonRendererComponent
  implements ICellRendererAngularComp {
  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onOpen($event) {
    if (this.params.onOpen instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.params.onOpen(params);
    }
  }
}
