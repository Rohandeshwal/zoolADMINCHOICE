import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './pages/users/users.component';

import { UserListingComponent } from './components/user-listing/user-listing.component';


@NgModule({
  declarations: [UsersComponent,UserListingComponent],
  imports: [
    CommonModule,SharedModule,UserRoutingModule
  ]
})

export class UserModule { }
