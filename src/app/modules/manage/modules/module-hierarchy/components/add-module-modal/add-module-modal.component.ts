import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModuleService } from "src/app/core/services/modules.service";
import { DomSanitizer } from "@angular/platform-browser";
import { SharedService } from "src/app/core/services/shared.service";
import { WarningModalComponent } from "src/app/shared/components/warning-modal/warning-modal.component";
import { DescriptionModalComponent } from "src/app/shared/components/description-modal/description-modal.component";

@Component({
  selector: "app-add-module-modal",
  templateUrl: "./add-module-modal.component.html",
  styleUrls: ["./add-module-modal.component.scss"],
})
export class AddModuleModalComponent implements OnInit {
  showHierarchy: boolean;
  @Output() continue = new EventEmitter();
  @Output() selectedModule = new EventEmitter();
  @Input() mode: any;
  @Input() relationId: any;
  parentModule: any;
  status: any;
  pageSize: any = 5;
  pageNumber: any = 1;
  subModules = [];
  createHierarchyPayload = {
    hierarchyRelations: [
      {
        modules: [],
      },
    ],
  };
  moduleName: any;
  constructor(
    private modalService: NgbModal,
    private moduleService: ModuleService,
    public activeModal: NgbActiveModal,

    private sanitizer: DomSanitizer,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getHierarchyModules(this.mode, this.relationId);
  }

  // call Hierarchy api depend on the mode and relation id
  getHierarchyModules(mode, relationId) {
    this.subModules = [];
    if (mode === "parent") {
      this.getModuleToCreateHierarchy();
    }
    if (mode === "child" && relationId) {
      this.getModuleToCreateHierarchyRelation(relationId);
    }
  }

  // Get Module To Create Hierarchy
  getModuleToCreateHierarchy() {
    this.moduleService.getModuleToCreateHierarchy().subscribe(
      (res) => {
        if (res && res.content && res.content.length) {
          this.subModules = this.getMappedModules(res.content);
        } else {
          this.sharedService.showInfo("No modules data found");
        }
      },
      (err) => {
        this.sharedService.showError(
          "Error while getting modules for hierarchy"
        );
      }
    );
  }
  // Get ModuleTo Create Hierarchy Relation
  getModuleToCreateHierarchyRelation(relationId) {
    this.moduleService.getModuleToCreateHierarchyRelation(relationId).subscribe(
      (res) => {
        if (res && res.content && res.content.length) {
          this.subModules = this.getMappedModules(res.content);
        } else {
          this.sharedService.showInfo("No modules data found");
        }
      },
      (err) => {
        this.sharedService.showError(
          "Error while getting modules for hierarchy Relation"
        );
      }
    );
  }

  // get modules mapped to hierarchy
  getMappedModules(data) {
    let modulesArray = [];
    data.forEach((element) => {
      modulesArray.push({
        imgLink:
          element && element.images && element.images.length
            ? element.images[0].image
            : "",
        moduleId: element.id,
        name: element.moduleLabels[0].name,
        // description: element.entityDescriptions[0].name,
        description: "",
        version: element.version,
        moduleCode: element.moduleCode,
      });
    });
    return modulesArray;
  }

  // get image
  getImage(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${image}`);
  }

    // on click on view description
    onClickDesc(data?) {
      if (data && data.moduleId) {
        this.moduleService.getModuleDescription(data.moduleId).subscribe(
          (res) => {
            if (res && res.name) {
              this.onDescModalOpen(res.name);
            } else {
              this.sharedService.showError("while fetching description");
            }
          },
          (err) => {
            this.sharedService.showError("while fetching description");
          }
        );
      }
    }
  
    onDescModalOpen(description) {
      let descModal = this.modalService.open(DescriptionModalComponent, {
        size: "lg",
      });
      descModal.componentInstance.descData = description;
      descModal.componentInstance.status.subscribe((res) => {});
    }

  // select parent module
  selectParentModule(module) {
    // this.parentModule = module;
    this.checkTopModule(module);
  }

  // check the selected module is top level module or not
  checkTopModule(module) {
    if (module && module.moduleId) {
      this.moduleService.checkTopLevelModule(module.moduleId).subscribe(
        (res) => {
          if (res && res.id) {
            this.onWarning(module);
          } else {
            this.parentModule = module;
          }
        },
        (err) => {
          this.sharedService.showError("Error while fetching module data");
        }
      );
    }
  }

  // on call delete function
  onWarning(module) {
    let warningModal = this.modalService.open(WarningModalComponent, {});
    warningModal.componentInstance.status.subscribe((res) => {
      if (res === true) {
        this.parentModule = module;
      } else {
        this.parentModule = "";
      }
    });
  }

  dismissModal(status) {
    this.status.emit(status);
    this.activeModal.close();
  }

  // add modules in hierarchy depends on the mode
  subModuleSelected() {
    if (this.mode === "parent") {
      // add parent for root hierarchy
      if (this.parentModule.moduleId) {
        this.createHierarchyPayload.hierarchyRelations[0].modules.push({
          version: this.parentModule.version,
          id: this.parentModule.moduleId,
          moduleCode: "",
        });
        this.createHierarchy(this.createHierarchyPayload);
      } else {
        this.sharedService.showInfo(
          "Please select parent module for hierarchy"
        );
      }
    }

    if (this.mode === "child") {
      // add child for root hierarchy
      if (this.parentModule.moduleId) {
        this.selectedModule.emit(this.parentModule);
        this.modalService.dismissAll();
      } else {
        this.sharedService.showInfo("Please select child module for hierarchy");
      }
    }
  }

  // create Hierarchy
  createHierarchy(createHierarchyPayload) {
    this.moduleService.createHierarchy(createHierarchyPayload).subscribe(
      (res) => {
        if (res && res.id) {
          this.sharedService.showSuccess("Hierarchy created successfully");
          this.continue.emit(res.id);
          this.modalService.dismissAll();
        }
      },
      (err) => {
        this.sharedService.showError("Error while creating Hierarchy");
      }
    );
  }
  onSelect(status) {
    this.modalService.dismissAll();
  }

  // search module depend on relation
  searchModule() {
    if (this.moduleName) {
      this.subModules = [];
      if (this.mode === "parent") {
        this.searchModuleToCreateHierarchy(this.moduleName);
      }
      if (this.mode === "child" && this.relationId) {
        this.searchModuleToCreateHierarchyRelation(
          this.moduleName,
          this.relationId
        );
      }
    } else {
      this.getHierarchyModules(this.mode, this.relationId);
    }
  }

  // clear the search
  clearSearch() {
    this.moduleName = "";
    this.getHierarchyModules(this.mode, this.relationId);
  }

  //Search Module To Create Hierarchy
  searchModuleToCreateHierarchy(moduleName) {
    this.moduleService.searchModuleToCreateHierarchy(moduleName).subscribe(
      (res) => {
        if (res && res.content && res.content.length) {
          this.subModules = this.getMappedModules(res.content);
        } else {
          this.sharedService.showInfo("No modules data found");
        }
      },
      (err) => {
        this.sharedService.showError(
          "Error while getting modules for hierarchy"
        );
      }
    );
  }

  //Search Module To Create Hierarchy Relation
  searchModuleToCreateHierarchyRelation(moduleName, relationId) {
    this.moduleService
      .searchModuleToCreateHierarchyRelation(moduleName, relationId)
      .subscribe(
        (res) => {
          if (res && res.content && res.content.length) {
            this.subModules = this.getMappedModules(res.content);
          } else {
            this.sharedService.showInfo("No modules data found");
          }
        },
        (err) => {
          this.sharedService.showError(
            "Error while getting modules for hierarchy Relation"
          );
        }
      );
  }
}
