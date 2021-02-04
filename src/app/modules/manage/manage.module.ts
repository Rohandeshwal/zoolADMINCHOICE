import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";

// * Modules
import { SharedModule } from "../../shared/shared.module";
import { ManageRoutingModule } from "./manage-routing.module";
import { ManageMainComponent } from './pages/manage-main/manage-main.component';

@NgModule({
  declarations: [
    ManageMainComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ManageRoutingModule,
    SharedModule
  ],
  providers:[]
})
export class ManageModule {}
