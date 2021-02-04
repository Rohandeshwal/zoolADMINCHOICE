import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageModulesHierarchyComponent} from './pages/manage-modules-hierarchy/manage-modules-hierarchy.component';
import { AddModulesHierarchyComponent} from './components/add-modules-hierarchy/add-modules-hierarchy.component';
import { CreateHierarchyComponent} from './components/create-hierarchy/create-hierarchy.component';
import { HierarchyComponent} from './components/hierarchy/hierarchy.component';
import { ManageModulesHierarchyListingComponent} from './components/manage-modules-hierarchy-listing/manage-modules-hierarchy-listing.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModuleHierarchyRoutingModule } from './module-hierarchy-routing.module';
import { HierarchyChildTemplateComponent } from './components/hierarchy-child-template/hierarchy-child-template.component';
import { EditModuleModalComponent } from './components/edit-module-modal/edit-module-modal.component';
import { AddModuleModalComponent } from './components/add-module-modal/add-module-modal.component';

@NgModule({
  declarations: [ManageModulesHierarchyComponent,AddModulesHierarchyComponent,CreateHierarchyComponent,HierarchyComponent,ManageModulesHierarchyListingComponent, HierarchyChildTemplateComponent, EditModuleModalComponent, AddModuleModalComponent],
  imports: [
    CommonModule,SharedModule,ModuleHierarchyRoutingModule
  ]
})
export class ModuleHierarchyModule { }
