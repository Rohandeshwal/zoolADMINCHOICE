import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Third Party Modules
// import { QuillModule, QuillEditorComponent, QUILL_CONFIG_TOKEN } from "ngx-quill";
import { TokenInterceptor } from "./core/interceptors/http-token.interceptor";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { ToastrModule } from "ngx-toastr";

//Default modules registered in app module
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

//App routing
import { AppRoutingModule } from "./app-routing.module";

//App component
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { QuillModule } from "ngx-quill";
import { NgHttpLoaderModule } from "ng-http-loader";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-right",
      preventDuplicates: false,
    }),
    NgxPaginationModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ header: 1 }, { header: 2 }],
          ["blockquote", "code-block"],
          ["image"],
        ],
      },
    }),
    NgbModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
