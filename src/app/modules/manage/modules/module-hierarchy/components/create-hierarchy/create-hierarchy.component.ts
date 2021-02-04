import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddModuleModalComponent } from "../add-module-modal/add-module-modal.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ModuleService } from "src/app/core/services/modules.service";
import { SharedService } from "src/app/core/services/shared.service";

@Component({
  selector: "app-create-hierarchy",
  templateUrl: "./create-hierarchy.component.html",
  styleUrls: ["./create-hierarchy.component.scss"],
})
export class CreateHierarchyComponent implements OnInit {
  showHierarchy: boolean;
  mapData: any[];
  hierarchyData: any;

  parentChildObjBuffer: any;
  parentId: any;
  currentHierarchyId: any;

  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private moduleService: ModuleService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getCurrentHierarchyId();
  }

  // get Hierarchy id from params
  getCurrentHierarchyId() {
    this.activatedRoute.params.subscribe(
      (res) => {
        if (res && res.hierarchyId) {
          this.currentHierarchyId = res.hierarchyId;
          this.getCurrentHierarchyData(res.hierarchyId);
          this.showHierarchy = true;
        }
      },
      (err) => {
        console.log("error", err);
      }
    );
  }

  // get Hierarchy Data by  hierarchyId
  getCurrentHierarchyData(hierarchyId) {
    this.moduleService.getHierarchyByID(hierarchyId).subscribe(
      (res) => {
        this.hierarchyData = res;
        this.mapHierarchy(res);
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  //
  openModalsList() {
    let modalRef = this.modalService.open(AddModuleModalComponent, {});
    modalRef.componentInstance.mode = "parent";
    modalRef.componentInstance.continue.subscribe((res) => {
      this.showHierarchy = true;
      this.router.navigate(["manage/module-hierarchy/edit/", res]);
    });
  }

  mapHierarchy(data) {
    this.mapData = [];
    if (data && data.hierarchyRelations && data.hierarchyRelations.length) {
      this.parentId = this.hierarchyData.hierarchyRelations[0].id;
      this.mapToChartObject(data.hierarchyRelations[0], "parent");
    }
  }

  mapToChartObject(hierarchy, level, parentName?) {
    if (hierarchy && hierarchy.modules && hierarchy.modules.length) {
      let parent = hierarchy.modules[0];
      this.mapData.push({
        parent: parentName ? parentName : "",
        type: "M",
        image: parent.images[0].image,
        child: parent.moduleLabels[0].name,
        version: parent.version,
        id: parent.id,
        parentId: this.parentId,
        relationId: hierarchy.id,
        level: level,
      });
      if (hierarchy && hierarchy.relations && hierarchy.relations.length) {
        hierarchy.relations.forEach((each) => {
          this.mapToChartObject(each, "child", parent.moduleLabels[0].name);
        });
      }
    }

    if (
      hierarchy &&
      hierarchy.businessComponentRelations &&
      hierarchy.businessComponentRelations.length
    ) {
      let parent = hierarchy.businessComponentRelations[0];
      this.mapData.push({
        parent: parentName ? parentName : "",
        type: "BC",
        child: parent.businessComponents[0].businessComponentLabels[0].name,
        image: parent.businessComponents[0].images[0].image,
        version: parent.version,
        id: parent.id,
        parentId: this.parentId,
        relationId: hierarchy.id,
        level: level
      });
      if (hierarchy && hierarchy.relations && hierarchy.relations.length) {
        hierarchy.relations.forEach((each) => {
          this.mapToChartObject(
            each,
            "child",
            parent.businessComponentRelations[0].name
          );
        });
      }
    }
  }
  // on select on child module to add in parent module
  getParentChildData(event) {
    this.parentChildObjBuffer = event;
    this.createPayload(event, this.hierarchyData.hierarchyRelations);
  }

  // crete parent child add payload
  createPayload(parentChildObj, hierarchy) {
    if (hierarchy && hierarchy.length) {
      let parentId = this.parentId;
      hierarchy.forEach((each) => {
        if (each.modules[0].id === parentChildObj.parent.id) {
          if (each.relations && each.relations.length) {
            each.relations.push({
              parentId: parentId,
              modules: [
                {
                  version: parentChildObj.child.version,
                  id: parentChildObj.child.moduleId,
                  moduleCode: "",
                },
              ],
            });
          } else {
            each.relations = [
              {
                parentId: parentId,
                modules: [
                  {
                    version: parentChildObj.child.version,
                    id: parentChildObj.child.moduleId,
                    moduleCode: "",
                  },
                ],
              },
            ];
          }
        } else {
          this.findRecursively(this.hierarchyData.hierarchyRelations);
        }
      });
      this.updateModuleHierarchy(this.hierarchyData);
    }
  }

  findRecursively(hierarchy) {
    let foundOne = false;
    if (hierarchy && hierarchy.length) {
      let parentId = this.parentId;
      hierarchy.forEach((each) => {
        if (each.modules[0].id === this.parentChildObjBuffer.parent.id) {
          foundOne = true;
          if (each.relations && each.relations.length) {
            each.relations.push({
              parentId: parentId,
              modules: [
                {
                  version: this.parentChildObjBuffer.child.version,
                  id: this.parentChildObjBuffer.child.moduleId,
                  moduleCode: "",
                },
              ],
            });
          } else {
            each.relations = [
              {
                parentId: parentId,
                modules: [
                  {
                    version: this.parentChildObjBuffer.child.version,
                    id: this.parentChildObjBuffer.child.moduleId,
                    moduleCode: "",
                  },
                ],
              },
            ];
          }
        }
      });
      if (!foundOne) {
        if (hierarchy && hierarchy.length) {
          hierarchy.forEach((parentRelation) => {
            if (
              parentRelation &&
              parentRelation.relations &&
              parentRelation.relations.length
            ) {
              this.findRecursively(parentRelation.relations);
            }
          });
        }
      }
    }
  }

  updateModuleHierarchy(hierarchy) {
    this.moduleService.updateModuleHierarchy(hierarchy).subscribe(
      (res) => {
        if (res) {
          this.hierarchyData.hierarchyRelations = [];
          this.showHierarchy = true;
          this.getCurrentHierarchyData(res.id);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //getCurrentRelation
  getCurrentRelation(event) {
    this.deleteHierarchyRelation(event);
  }

  deleteHierarchyRelation(data) {
    if (data && data.relationId) {
      if (data.level === "child") {
        this.moduleService.deleteHierarchyRelation(data.relationId).subscribe(
          (res) => {
            this.hierarchyData.hierarchyRelations = [];
            this.showHierarchy = true;
            this.sharedService.showSuccess("Deleted successfully");
            this.getCurrentHierarchyData(this.currentHierarchyId);
          },
          (err) => {
            this.hierarchyData.hierarchyRelations = [];
            this.showHierarchy = true;
            this.sharedService.showError("Error while deleting");
            this.getCurrentHierarchyData(this.currentHierarchyId);
          }
        );
      }

      if (data.level === "parent") {
        this.deleteHierarchy();
      }
    }
  }

  deleteHierarchy() {
    if (this.currentHierarchyId) {
      this.moduleService.deleteHierarchy(this.currentHierarchyId).subscribe(
        (res) => {
          if (res) {
            this.sharedService.showError("Error while deleting hierarchy");
          } else {
            this.sharedService.showSuccess("Hierarchy deleted successfully");
            this.router.navigate(["manage/module-hierarchy/list"]);
          }
        },
        (err) => {
          this.sharedService.showError("Error while deleting hierarchy");
        }
      );
    }
  }
  //
}
