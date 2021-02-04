import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxFileDropModule } from "ngx-file-drop";

// Components
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { DeleteConfirmationComponent } from "./components/delete-confirmation/delete-confirmation.component";
import { UploadComponent } from "./components/upload/upload.component";
import { ButtonRendererComponent } from "./components/renderer/button-renderer/buttonRenderer";
import { SocialMediaButtonRendererComponent } from "./components/renderer/social-media-buttons/social-media-buttons";
import { AddToModulesComponent } from "./components/renderer/add-to-modules/addToModules";

//3rd party libraries
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgxPaginationModule } from "ngx-pagination";
import { QuillModule, QuillEditorComponent } from "ngx-quill";
import { AgGridModule } from "ag-grid-angular";
import { AngularDualListBoxModule } from "angular-dual-listbox";
import { FormsModule } from "@angular/forms";
import { CapitalizePipe } from "./pipes/capitalize.pipe";
import {
  ListBoxAllModule,
  ListBoxComponent,
} from "@syncfusion/ej2-angular-dropdowns";
import {
  ButtonAllModule,
  ButtonComponent,
} from "@syncfusion/ej2-angular-buttons";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { NgSelectModule } from "@ng-select/ng-select";
import { WarningModalComponent } from "./components/warning-modal/warning-modal.component";
import { DescriptionModalComponent } from "./components/description-modal/description-modal.component";

@NgModule({
  declarations: [
    FileUploadComponent,
    DeleteConfirmationComponent,
    UploadComponent,
    AddToModulesComponent,
    ButtonRendererComponent,
    SocialMediaButtonRendererComponent,
    CapitalizePipe,
    WarningModalComponent,

    DescriptionModalComponent,
    // ListBoxComponent, ButtonComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgxFileDropModule,
    AgGridModule.withComponents([
      ButtonRendererComponent,
      AddToModulesComponent,
      SocialMediaButtonRendererComponent,
    ]),
    NgxPaginationModule,
    // QuillModule.forRoot({
    //   modules: {
    //     syntax: true,
    //     toolbar: [
    //       [{ size: ["small", false, "large", "huge"] }],
    //       ["bold", "italic", "underline", "strike"],
    //       [{ header: 1 }, { header: 2 }],
    //       ["blockquote", "code-block"],
    //       ["link", "image"],
    //     ],
    //   },
    // }),
    NgMultiSelectDropDownModule.forRoot(),
    SelectDropDownModule,
    NgSelectModule,
    ListBoxAllModule,
    ButtonAllModule,
  ],
  exports: [
    FormsModule,
    NgbModule,
    FileUploadComponent,
    CapitalizePipe,
    UploadComponent,
    ButtonRendererComponent,
    SocialMediaButtonRendererComponent,
    AgGridModule,
    NgxPaginationModule,
    NgSelectModule,
    QuillModule,
    AngularDualListBoxModule,
    NgMultiSelectDropDownModule,
    SelectDropDownModule,
    ListBoxAllModule,
    ButtonAllModule,
  ],
  entryComponents: [DeleteConfirmationComponent],
  providers: [QuillEditorComponent],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
