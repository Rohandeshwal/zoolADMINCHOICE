import { Component, OnInit } from "@angular/core";
import { ManageObject } from "./model/add-manage-modules-form.model";
import { SharedService } from "src/app/core/services/shared.service";
import { AppConfig } from "src/app/configurations/app.config";
import { Router, ActivatedRoute } from "@angular/router";
// import {ManageModule} from './model/add-manage-modules-form.model'
import { ModuleService } from "src/app/core/services/modules.service";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: "app-add-manage-modules-form",
  templateUrl: "./add-manage-modules-form.component.html",
  styleUrls: ["./add-manage-modules-form.component.scss"],
})
export class AddManageModulesFormComponent implements OnInit {
  moduleName: any;
  button: "Add"
  moduleIcon: any;
  uploadedIcon: any;
  moduleDescription: any;
  submitted: boolean;
  maxFileSize = AppConfig.maxFileSize;
  moduleCreateModel = {
    moduleCode: "",
    moduleLabels: [
      {
        name: "",
        code: "",
        language: "EN",
      },
    ],
    entityDescriptions: [
      {
        name: "",
        code: "",
        language: "EN",
      },
    ],
    images: [],
    links: [],
    videos: [],
    documents: [],
  };

  links = {
    links: [
      {
        url: "",
      },
    ],
    videos: [
      {
        url: "",
      },
    ],
    documents: [
      {
        url: "",
      },
    ],
  };
  mode: string = "add";
  moduleData: any;
  imageSource: any;
  imageAdd: boolean = false;
  imageEdit: boolean = false;
  imageEditSource: any;
  filesData: any;
  currentModuleName: any;
  moduleDescriptionData: any;

  constructor(
    private moduleService: ModuleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getCurrentModuleId();
  }

  // get module id from params
  getCurrentModuleId() {
    this.activatedRoute.params.subscribe(
      (res) => {
        if (res && res.moduleId) {
          this.mode = "edit";
          this.getCurrentModuleData(res.moduleId);
          this.getDescriptionForModule(res.moduleId);
        } else {
          this.mode = "add";
        }
      },
      (err) => {
        console.log("error", err);
      }
    );
  }

  // file upload
  fileUpload(event: any) {
    this.moduleCreateModel.images = [];
    this.filesData = event;
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].size < this.maxFileSize
    ) {
      let mimeType = event.target.files[0].type.split("/");
      let fileMimeType = mimeType && mimeType.length ? mimeType[1] : undefined; // check mime-Type of file
      let allSupportedFormats = AppConfig.supportedDocumentFormats;
      if (fileMimeType && allSupportedFormats.includes(fileMimeType)) {
        const dataLength: any = event.target.files;
        this.uploadedIcon = event.target.files[0].name;
        for (var i = 0; i < dataLength.length; i++) {
          let reader = new FileReader();
          reader.readAsDataURL(dataLength[i]);
          let fileNameType: any = dataLength[i].name;
          reader.onload = (element: any) => {
            let fileData = element.target.result;
            let base64Data = fileData;
            // let base64Data = fileData.split(",")[1];
            let filePayload = {
              image: base64Data,
            };
            this.moduleCreateModel.images.push(filePayload);
            console.log(this.moduleCreateModel)
            this.imageAdd = true;
            this.imageEdit = false;
            if (this.moduleCreateModel && this.moduleCreateModel.images[0]) {
              // this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.moduleCreateModel.images[0].image}`);
              this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.moduleCreateModel.images[0].image}`);
            }
          };
        }
      } else {
        this.imageAdd = false;
        this.sharedService.showError("File format is  invalid");
      }
    } else {
      this.imageAdd = false;
      this.sharedService.showError(AppConfig.maxFileSizeErrorMsg);
    }
  }

  // remove Icon
  removeIcon(index: number, mode) {
    if (mode === 'add') {
      this.moduleCreateModel.images.splice(index, 1);
      this.imageAdd = false;
      this.filesData.target.value = "";
    }
    if (mode === 'edit') {
      this.moduleData.images.splice(index, 1);
      this.imageEdit = false;
    }
  }

  getDescriptionForModule(moduleId) {
    this.moduleService.getModuleDescription(moduleId).subscribe(
      (res) => {
        if (res && res.name) {
          this.moduleDescriptionData = res;
          this.moduleDescription = this.moduleDescriptionData.name;
        } else {
          this.sharedService.showError("while fetching description");
        }
      },
      (err) => {
        this.sharedService.showError("while fetching description");
      }
    );
  }
  // get module data from module Id
  getCurrentModuleData(moduleId) {
    this.moduleService.getModule(moduleId).subscribe(
      (res) => {
        if (res && res.moduleLabels && res.moduleLabels.length) {
          this.moduleName = res.moduleLabels[0].name;
          this.currentModuleName = res.moduleLabels[0].name;
          this.moduleData = res;
          this.imageEdit = true;
          this.moduleData.entityDescriptions = [];
          if (this.moduleData && this.moduleData.images[0]) {
            this.imageEditSource = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.moduleData.images[0].image}`);
          }
        }
        if (res.documents && res.documents.length) {
          this.links.documents = res.documents;
        }
        if (res.links && res.links.length) {
          this.links.links = res.links;
        }
        if (res.videos && res.videos.length) {
          this.links.videos = res.videos;
        }
      },
      (err) => {
        this.sharedService.showError('Error to fetching Module');
      }
    );
  }

  // create payload depend on  mode 
  onSubmit(moduleForm) {
    if (moduleForm.form.valid) {
      if (this.mode === 'add') {
        this.checkModule();
      }
      if (this.mode === 'edit') {
        if (this.moduleName !== this.currentModuleName) {
          this.checkModule();
        } else {
          this.callModuleForAddUpdate();
        }
      }
    } else {
      this.sharedService.showError("Mandatory Field are required");
    }
  }

  // 
  onBack(){
    this.router.navigate(['manage/module/list'])
  }

  // check business name 
  checkModule() {
    this.moduleService.checkModule(this.moduleName).subscribe((res) => {
      if (res && res.id) {
        this.sharedService.showInfo('Module already exists, try another');
      } else {
        this.callModuleForAddUpdate();
      }
    }, (err) => {
      this.sharedService.showInfo('Error in fetching Module');
    })
  }


  // create payload depend on  mode 
  callModuleForAddUpdate() {
    if (this.mode === 'edit') {
      if (this.moduleCreateModel.images && this.moduleCreateModel.images.length || this.moduleData.images && this.moduleData.images.length) {
        this.moduleData.moduleLabels[0].name = this.moduleName;
        this.moduleDescriptionData.name = this.moduleDescription;
        this.moduleData.entityDescriptions.push(this.moduleDescriptionData);
        let filteredVideos = this.links.videos.filter(function (el) {
          return el.url != "";
        });
        let filteredLinks = this.links.links.filter(function (el) {
          return el.url != "";
        });
        let filteredDocuments = this.links.documents.filter(function (el) {
          return el.url != "";
        });

        this.moduleData.links = filteredLinks;
        this.moduleData.documents = filteredDocuments;
        this.moduleData.videos = filteredVideos;

        if (this.moduleCreateModel.images && this.moduleCreateModel.images.length) {
          this.moduleData.images = this.moduleCreateModel.images;
        } else {
          this.moduleData.images = this.moduleData.images;
        }
        this.updateModule();
      } else {
        this.sharedService.showError("Please upload icon");
      }
    }
    if (this.mode === 'add') {
      if (this.moduleCreateModel.images && this.moduleCreateModel.images.length) {
        this.moduleCreateModel.moduleLabels[0].name = this.moduleName;
        this.moduleCreateModel.entityDescriptions[0].name = this.moduleDescription;

        let filteredVideos = this.links.videos.filter(function (el) {
          return el.url != "";
        });
        let filteredLinks = this.links.links.filter(function (el) {
          return el.url != "";
        });
        let filteredDocuments = this.links.documents.filter(function (el) {
          return el.url != "";
        });
        this.moduleCreateModel.links = filteredLinks;
        this.moduleCreateModel.documents = filteredDocuments;
        this.moduleCreateModel.videos = filteredVideos;
        console.log(this.moduleCreateModel)
        this.addModule();
      } else {
        this.imageAdd = false;
        this.sharedService.showError("Please upload icon");
      }
    }
  }

  // add module 
  addModule() {
    this.moduleService.createModule(this.moduleCreateModel).subscribe(
      res => {
        if (res) {
          this.sharedService.showSuccess("added module successfully");
          this.router.navigate(['manage/module/list'])
        }
      },
      err => {
        this.sharedService.showError("Error while adding module");
      }
    )
  }


  // update module 
  updateModule() {
    this.moduleService.updateModule(this.moduleData).subscribe(
      res => {
        if (res) {
          this.sharedService.showSuccess("update module successfully");
          this.router.navigate(['manage/module/list']);
        }
      },
      err => {
        this.sharedService.showError("Error while updating module");
      }
    )
  }

}