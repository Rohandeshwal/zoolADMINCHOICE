import { NgModule, Optional, SkipSelf } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Components
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-once-loaded.guard';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ErrorComponent],
  imports: [
    CommonModule, NgbModule, RouterModule, HttpClientModule
  ],
  exports: [HeaderComponent, SidebarComponent, ErrorComponent],
  // providers: [HTTPService, SharedService]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}