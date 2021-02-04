import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ManageContextComponent } from './pages/manage-context/manage-context.component';
import { CreateContextComponent} from './components/create-context/create-context.component';
import { ContextListComponent} from './components/context-list/context-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContextRoutingModule } from './context-routing.module';
import { EditContextComponent } from './components/edit-context/edit-context.component';

@NgModule({
  declarations: [ManageContextComponent,CreateContextComponent,ContextListComponent, EditContextComponent],
  imports: [
    CommonModule,SharedModule,ContextRoutingModule
  ]
})
export class ContextModule { }
