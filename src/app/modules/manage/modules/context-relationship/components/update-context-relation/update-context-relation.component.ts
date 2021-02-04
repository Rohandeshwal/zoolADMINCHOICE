import { Component, OnInit, ViewChild } from "@angular/core";
import { ListBoxComponent } from "@syncfusion/ej2-angular-dropdowns";
import { ContextService } from "src/app/core/services/context.service";
import { SharedService } from "src/app/core/services/shared.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ContextRelationOverviewComponent } from "../context-relation-overview/context-relation-overview.component";

@Component({
  selector: "app-update-context-relation",
  templateUrl: "./update-context-relation.component.html",
  styleUrls: ["./update-context-relation.component.scss"],
})
export class UpdateContextRelationComponent implements OnInit {
  @ViewChild("listbox1", { static: false }) public listObj1: ListBoxComponent;
  @ViewChild("listbox2", { static: false }) public listObj2: ListBoxComponent;
  parentContext: any;
  parentValue: any;
  submitted: boolean;
  childValue: any;
  childContext: any;
  availableContexts1: any;
  availableContext1Dropdown: any;

  availableContexts2: any;
  availableContext2Dropdown: any;

  selectedContext1: any;
  selectedContext2: any;

  availableValues1: any;
  availableValues1Dropdown: any;

  availableValues2: any;
  availableValues2Dropdown: any;

  selectedParentValue: any;
  selectedChildValues: any[] = [];

  oldChildValues: any[] = [];
  oldChildValueOptions: any[] = [];

  public setfield = {
    text: "item_text",
  };

  public toolbar = {
    items: ["moveTo", "moveFrom", "moveAllTo", "moveAllFrom"],
  };
  // items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom'],
  config = {
    displayKey: "item_text",
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Select",
  };

  constructor(
    private contextService: ContextService,
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.getContextById();
  }

  getContextById() {
    this.activatedRoute.params.subscribe((res) => {
      this.contextService.getContextById(res.id).subscribe((context) => {
        if (res && !res.status) {
          console.log("---response for getContextById--", context);
          this.availableContexts1 = [context];
          this.parentContext = context.id;
          if (this.availableContexts1 && this.availableContexts1.length) {
            this.availableContext1Dropdown = this.availableContexts1.map(
              (each, index) => {
                console.log("---each--", each);
                return {
                  item_id: each.id,
                  item_text: each.contextLabels[0].name,
                  item_group_id: each.contextGroup.id,
                  item_index: index,
                };
              }
            );
            this.onParentContextChange(this.availableContext1Dropdown[0]);
          }
        }
      });
    });
  }

  onParentContextChange(event) {
    if (event) {
      let groupId = event.item_group_id;
      let id = event.item_id;
      let name = event.item_text;
      console.log("--parent context selected--", groupId, id, name);
      this.selectedContext1 = event;
      this.getContextForHierarchyByGroupId(groupId, id);
      this.getContextValues(id);
    } else {
      this.selectedContext1 = null;
      this.availableContext2Dropdown = [];
      this.availableContexts2 = [];
      this.availableValues1 = [];
      this.availableValues1Dropdown = [];

      this.parentContext = null;
      this.parentValue = null;
      this.childContext = null;
    }
  }

  getContextForHierarchyByGroupId(groupId, contextId) {
    this.contextService
      .getContextForHierarchyByGroupId(groupId, contextId)
      .subscribe(
        (res) => {
          this.availableContexts2 = res;
          if (this.availableContexts2 && this.availableContexts2.length) {
            this.availableContext2Dropdown = this.availableContexts2.map(
              (each, index) => {
                return {
                  item_id: each.id,
                  item_text: each.contextLabels[0].name,
                  item_group_id: each.contextGroup.id,
                  item_index: index,
                };
              }
            );
          }
        },
        (err) => {
          console.log("----error in getContextForHierarchyByGroupId----", err);
        }
      );
  }

  getContextValues(contextId) {
    this.contextService.getContextValueByIdUnpaged(contextId).subscribe(
      (res) => {
        console.log("--available context values for parent--", res);
        this.availableValues1 = res;
        if (this.availableValues1 && this.availableValues1.length) {
          this.availableValues1Dropdown = this.availableValues1.map(
            (each, index) => {
              console.log("---each--", each);
              return {
                item_id: each.id,
                item_text: each.contextValueLabels[0].name,
                item_index: index,
              };
            }
          );
        }
      },
      (err) => {
        console.error("error fetching context values", err);
      }
    );
  }

  onChildContextChange(event) {
    if (event) {
      this.selectedContext2 = event;
      if (this.selectedContext2 && this.selectedParentValue) {
        this.getContextValuesForChild(
          this.selectedContext2.item_id,
          this.selectedParentValue.item_id
        );
      }
    } else {
      this.selectedContext2 = null;
      this.availableValues2 = [];
      this.availableValues2Dropdown = [];

      this.oldChildValues = [];
      this.oldChildValueOptions = [];

      this.childValue = null;
      this.childContext = null;
    }
  }

  onParentContextValueChange(event) {
    if (event) {
      console.log("--selected parent value--", event.item_id);
      this.selectedParentValue = event;
      if (this.selectedContext2 && this.selectedParentValue) {
        this.getContextValuesForChild(
          this.selectedContext2.item_id,
          this.selectedParentValue.item_id
        );
      }
    } else {
      this.selectedParentValue = null;
      this.availableValues2 = [];
      this.availableValues2Dropdown = [];

      this.oldChildValues = [];
      this.oldChildValueOptions = [];

      this.parentValue = null;
      this.childValue = null;
    }
  }

  getContextValuesForChild(contextId, valueId) {
    this.contextService
      .getContextValueForHierarchyExceptSelected(contextId, valueId)
      .subscribe(
        (res) => {
          console.log("--available context values for child--", res);
          this.availableValues2 = res;
          this.getChildContextValuesForParent(contextId, valueId);
          if (this.availableValues2 && this.availableValues2.length) {
            this.availableValues2Dropdown = this.availableValues2.map(
              (each, index) => {
                console.log("---each--", each);
                return {
                  item_id: each.id,
                  item_text: each.contextValueLabels[0].name,
                  item_index: index,
                };
              }
            );
            this.selectedChildValues = [];
          }
        },
        (err) => {
          console.error("error fetching context values2", err);
        }
      );
  }

  getChildContextValuesForParent(contextId, parentId) {
    // console.log('parentContext-->',this.parentContext);
    console.log("parent value Id-->", parentId);
    console.log("childContext-->", contextId);
    this.contextService
      .getChildContextValuesForParent(contextId, parentId)
      .subscribe(
        (res) => {
          console.log("child values for parent-->", res);
          if (res && !res.status) {
            this.oldChildValues = res;
            this.oldChildValueOptions = this.oldChildValues.map(
              (each, index) => {
                console.log("---each--", each);
                return {
                  item_id: each.id,
                  item_text: each.contextValueLabels[0].name,
                  item_index: index,
                  old: true,
                };
              }
            );
          }
        },
        (err) => {
          console.error("error while fetching child values for parent-->", err);
        }
      );
  }

  createPayload() {
    this.selectedChildValues = [];
    let toBeRemoved = [];
    this.listObj2.getDataList().forEach((each) => {
      this.selectedChildValues.push(this.availableValues2[each.item_index]);
    });

    this.listObj1.getDataList().forEach((each) => {
      if (each.old) {
        toBeRemoved.push(this.oldChildValues[each.item_index]);
      }
    });

    if (toBeRemoved && toBeRemoved.length) {
      toBeRemoved.forEach((each) => {
        delete each.parentId;
      });
    }

    console.log("----old values--", toBeRemoved);

    let parentPayload = JSON.parse(
      JSON.stringify(this.availableContexts1[this.selectedContext1.item_index])
    );
    let childPayload = this.availableContexts2[
      this.selectedContext2.item_index
    ];

    parentPayload.childId = this.availableContexts2[
      this.selectedContext2.item_index
    ].id;

    childPayload.contextValues = this.selectedChildValues;
    childPayload.contextValues.forEach((each) => {
      each.parentId = this.selectedParentValue.item_id;
    });

    childPayload.contextValues = childPayload.contextValues.concat(toBeRemoved);

    console.log("parent payload--", parentPayload);
    console.log("child payload--", childPayload);
    console.log("--old child values--", this.oldChildValues);
    let childChanged: boolean = false;
    // starts here
    //if not same children, delete the children first for the old parent--> ask surjit sir about this
    if (this.availableContexts1[0].childContext.id !== parentPayload.childId) {
      childChanged = true;
      console.log("child changed-->");
    } else {
      console.log("same child-->");
    }

    delete parentPayload.childContext;
    // ends here
    return {
      parent: parentPayload,
      child: childPayload,
      oldChild: this.availableContexts1[0].childContext,
      childChanged,
    };
  }

  updateRelation(relationshipForm) {
    console.log("form ref valid--->", relationshipForm.form.valid);
    console.log("--list2 child context--", this.listObj2.getDataList());
    console.log("--list1 child context", this.listObj1.getDataList());

    this.submitted = true;
    if (relationshipForm.form.valid && this.listObj2.getDataList().length) {
      const payload: any = this.createPayload();
      console.log("---payload---", payload);
      let allRequests = [];
      if (payload.childChanged) {
        allRequests.push(this.updateOldChildValues(payload.oldChild));
      }

      allRequests.push(
        this.contextService.updateContext(payload.parent).toPromise()
      );
      allRequests.push(
        this.contextService.updateContext(payload.child).toPromise()
      );

      Promise.all(allRequests).then(
        (res) => {
          let success = res.every((each) => each && !each.status);
          if (res && res.length && success) {
            console.log("--context updated--", res);
            this.sharedService.showSuccess("Relationship updated successfully");
            this.router.navigate(["/manage/context-relationship"]);
          } else {
            console.error("--res--", res);
            this.router.navigate(["/manage/context-relationship"]);
            this.sharedService.showError(
              "Error while updating relationship, please try again later"
            );
          }
        }).catch(err => {
          console.error("--error--", err);
          this.router.navigate(["/manage/context-relationship"]);
          this.sharedService.showError(
            "Error while updating relationship, please try again later"
          );
        }
      );
    } else {
      this.sharedService.showWarning(
        "Fill all the mandatory fields to proceed"
      );
    }
  }

  updateOldChildValues(oldChild) {
    return this.contextService
      .getChildContextValuesForParent(
        this.availableContexts1[0].childContext.id,
        this.selectedParentValue.item_id
      )
      .toPromise()
      .then((res) => {
        console.log("--old values--", res);

        oldChild.contextValues = res;
        oldChild.contextValues.forEach((val) => delete val.parentId);
        return this.contextService.updateContext(oldChild).toPromise();
      })
      .catch((err) => {
        console.log("--old values-- error", err);
      });
  }

  showOverview() {
    let modal = this.modalService.open(ContextRelationOverviewComponent);
  }
}
