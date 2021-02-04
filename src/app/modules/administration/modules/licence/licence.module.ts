import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LicenceRoutingModule } from './licence-routing.module';
import { LicenceComponent } from './pages/licence/licence.component';
import { LicenceCreateComponent } from './components/licence-create/licence-create.component';
import { LicenceEditComponent } from './components/licence-edit/licence-edit.component';
import { LicenceListComponent } from './components/licence-list/licence-list.component';
import { LicenceTableComponent } from './components/licence-table/licence-table.component';


@NgModule({
  declarations: [LicenceComponent,LicenceCreateComponent,LicenceEditComponent,LicenceListComponent,LicenceTableComponent],
  imports: [
    CommonModule,SharedModule,LicenceRoutingModule
  ]
})
export class LicenceModule { }
