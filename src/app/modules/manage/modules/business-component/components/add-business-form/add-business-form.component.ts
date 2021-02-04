import { Component, OnInit } from "@angular/core";
import { ManageBusiness } from "./model/add-business-form.model";
import { AppConfig } from "src/app/configurations/app.config";
import { BusinessService } from "src/app/core/services/business.service";
import { SharedService } from "src/app/core/services/shared.service";

import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: "app-add-business-form",
  templateUrl: "./add-business-form.component.html",
  styleUrls: ["./add-business-form.component.scss"],
})
export class AddBusinessFormComponent implements OnInit {
  maxFileSize = AppConfig.maxFileSize;
  businessComponentModel = {
    businessComponentCode: "",
    businessComponentLabels: [
      {
        name: "",
        code: "",
        language: "EN",
      },
    ],
    entityDescriptions: [
      {
        "name": "",
        "code": "",
        "language": "EN"
      }
    ],
    "images": [],
    "links": [],
    "videos": [],
    "documents": []
  };

  links = {
    "links": [{
      url: ""
    }],
    "videos": [{
      url: ""
    }],
    "documents": [{
      url: ""
    }]
  }
  businessFormData: ManageBusiness;
  showBusinessField: boolean;
  showModuleList: boolean;
  businessComponentDescription: string;
  businessComponentName: string;
  submitted: boolean;
  mode: string;
  businessComponentData: any;
  imageEditSource: any;
  imageEdit: boolean;
  imageSource: any;
  imageAdd: boolean;
  filesData: any;
  uploadedIcon: any;
  currentBusinessComponentName: any;
  businessDescriptionData: any;
  constructor(
    private businessService: BusinessService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer
  ) { }
  ngOnInit() {
    this.getCurrentBusinessComponentId();
  }

  // get module id from params
  getCurrentBusinessComponentId() {
    this.activatedRoute.params.subscribe(
      (res) => {
        if (res && res.businessComponentId) {
          this.mode = "edit";
          this.getBusinessComponent(res.businessComponentId);
          this.getDescriptionForBusiness(res.businessComponentId);
        } else {
          this.mode = "add";
        }
      },
      (err) => {
        console.log("error", err);
      }
    );
  }


  fileUpload(event: any) {
    this.uploadedIcon = event.target.files[0].name;
    this.businessComponentModel.images = [];
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
            this.businessComponentModel.images.push(filePayload);
            this.imageAdd = true;
            this.imageEdit = false;
            if (this.businessComponentModel && this.businessComponentModel.images[0]) {
              this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.businessComponentModel.images[0].image}`);
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
      this.businessComponentModel.images.splice(index, 1);
      this.filesData.target.value = "";
      this.imageAdd = false;
    }
    if (mode === 'edit') {
      this.businessComponentData.images.splice(index, 1);
      this.imageEdit = false;
    }
  }

  // get Business Component description
  getDescriptionForBusiness(businessComponentId) {
    this.businessService.getBusinessComponentsDescription(businessComponentId).subscribe(
      (res) => {
        if (res && res.name) {
          this.businessDescriptionData = res;
          this.businessComponentDescription = this.businessDescriptionData.name;
        } else {
          this.sharedService.showError("while fetching description");
        }
      },
      (err) => {
        this.sharedService.showError("while fetching description");
      }
    );
  }

  // get Business Component Data
  getBusinessComponent(businessComponentId) {
    this.businessService.getBusinessComponent(businessComponentId).subscribe(
      (res) => {
        if (res && res.businessComponentLabels && res.businessComponentLabels.length) {
          this.businessComponentName = res.businessComponentLabels[0].name;
          this.currentBusinessComponentName = res.businessComponentLabels[0].name;
          this.businessComponentData = res;
          this.imageEdit = true;
          this.businessComponentData.entityDescriptions = [];
          if (this.businessComponentData && this.businessComponentData.images[0]) {
            this.imageEditSource = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.businessComponentData.images[0].image}`);
          }
        }

        if (res && res.documents && res.documents.length) {
          this.links.documents = res.documents;
        }
        if (res && res.links && res.links.length) {
          this.links.links = res.links;
        }
        if (res && res.videos && res.videos.length) {
          this.links.videos = res.videos;
        }
      },
      (err) => {
        this.sharedService.showError('Error to fetching Business Component');
      }
    );
  }

  // create payload depend on  mode 
  createBusinessComponentPayload(businessForm) {
    if (businessForm.form.valid) {
      if (this.mode === 'add') {
        this.checkBusinessComponent();
      }
      if (this.mode === 'edit') {
        if (this.businessComponentName !== this.currentBusinessComponentName) {
          this.checkBusinessComponent();
        } else {
          this.callBusinessComponent();
        }
      }
    } else {
      this.sharedService.showError("Mandatory Field are required");
    }
  }

  // check business name 
  checkBusinessComponent() {
    this.businessService.checkBusinessComponent(this.businessComponentName).subscribe((res) => {
      if (res && res.id) {
        this.sharedService.showInfo('Business Component Name already exists, try another');
      } else {
        this.callBusinessComponent();
      }
    }, (err) => {
      this.sharedService.showInfo('Error in fetching Business Component');
    })
  }

  // call create and update api for business component 
  callBusinessComponent() {
    if (this.mode === 'edit') {
      if (this.businessComponentModel.images && this.businessComponentModel.images.length || this.businessComponentData.images && this.businessComponentData.images.length) {
        this.businessComponentData.businessComponentLabels[0].name = this.businessComponentName;

        this.businessDescriptionData.name = this.businessComponentDescription;
        this.businessComponentData.entityDescriptions.push(this.businessDescriptionData);

        // this.businessComponentData.entityDescriptions[0].name = this.businessComponentDescription;
        let filteredVideos = this.links.videos.filter(function (el) {
          return el.url != "";
        });
        let filteredLinks = this.links.links.filter(function (el) {
          return el.url != "";
        });
        let filteredDocuments = this.links.documents.filter(function (el) {
          return el.url != "";
        });
        this.businessComponentData.links = filteredLinks;
        this.businessComponentData.documents = filteredDocuments;
        this.businessComponentData.videos = filteredVideos;
        if (this.businessComponentModel.images && this.businessComponentModel.images.length) {
          this.businessComponentData.images = this.businessComponentModel.images;
        } else {
          this.businessComponentData.images = this.businessComponentData.images;
        };
        this.updateBusinessComponent();
      } else {
        this.sharedService.showError("Please upload icon");
      }
    }
    if (this.mode === 'add') {
      if (this.businessComponentModel.images && this.businessComponentModel.images.length) {
        this.businessComponentModel.businessComponentLabels[0].name = this.businessComponentName;
        this.businessComponentModel.entityDescriptions[0].name = this.businessComponentDescription;
        let filteredVideos = this.links.videos.filter(function (el) {
          return el.url != "";
        });
        let filteredLinks = this.links.links.filter(function (el) {
          return el.url != "";
        });
        let filteredDocuments = this.links.documents.filter(function (el) {
          return el.url != "";
        });
        this.businessComponentModel.links = filteredLinks;
        this.businessComponentModel.documents = filteredDocuments;
        this.businessComponentModel.videos = filteredVideos;
        this.addBusinessComponent();
      } else {
        this.imageAdd = false;
        this.sharedService.showError("Please upload icon");
      }
    }
  }
  // on back
  onBack() {
    this.router.navigate(["manage/business-component/list"]);
  }


  addBusinessComponent() {
    this.submitted = true;
    this.businessService
      .createBusinessComponent(this.businessComponentModel)
      .subscribe(
        (res) => {
          this.sharedService.showSuccess(
            "added business component successfully"
          );
          this.router.navigate(["manage/business-component/list"]);
        },
        (err) => {
          this.sharedService.showError("Error while adding Business component");
        }
      );
  }


  // update module 
  updateBusinessComponent() {
    this.businessService.updateBusinessComponent(this.businessComponentData).subscribe(
      res => {
        this.sharedService.showSuccess("Business component updated successfully");
        this.router.navigate(["manage/business-component/list"]);
      },
      err => {
        this.sharedService.showError("Error while updating Business component");
      }
    )
  }
}
