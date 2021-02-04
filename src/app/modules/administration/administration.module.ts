import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdministrationRoutingModule } from "./administration-routing.module";


import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrationMainComponent } from './pages/administration-main/administration-main.component';
@NgModule({
  declarations: [
  AdministrationMainComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule
  ],
  providers: [],
  exports:[]
})
export class AdministrationModule {}
