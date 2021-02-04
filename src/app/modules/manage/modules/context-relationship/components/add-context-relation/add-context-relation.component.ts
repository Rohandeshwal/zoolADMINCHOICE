import { Component, OnInit, ViewChild } from "@angular/core";
import { ListBoxComponent } from "@syncfusion/ej2-angular-dropdowns";
import { ContextService } from "src/app/core/services/context.service";
import { SharedService } from "src/app/core/services/shared.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ContextRelationOverviewComponent } from "../context-relation-overview/context-relation-overview.component";

@Component({
  selector: "app-add-context-relation",
  templateUrl: "./add-context-relation.component.html",
  styleUrls: ["./add-context-relation.component.scss"],
})
export class AddContextRelationComponent implements OnInit {
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
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getContextForHierarchy();
  }

  getContextForHierarchy() {
    this.contextService.getContextForHierarchy().subscribe(
      (res) => {
        console.log("----response for getContextForHierarchy----", res);
        this.availableContexts1 = res;
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
        }
      },
      (err) => {
        console.log("----error in getContextForHierarchy----", err);
      }
    );
  }

  onParentContextChange(event) {
    console.log("---event selected----", event);
    console.log("----parentContext---", this.parentContext);
    if (event) {
      let groupId = event.item_group_id;
      let id = event.item_id;
      let name = event.item_text;
      console.log("--parent context selected--", groupId, id, name);
      this.selectedContext1 = event;

      // console.log('---selected index---',this.selectedContext1);
      // console.log('--selected context--',this.availableContexts1[this.selectedContext1]);
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
          console.log(
            "----response for getContextForHierarchyByGroupId----",
            res
          );
          this.availableContexts2 = res;
          if (this.availableContexts2 && this.availableContexts2.length) {
            this.availableContext2Dropdown = this.availableContexts2.map(
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
            console.log(
              "<--context2 dropdown-->",
              this.availableContext2Dropdown
            );
          }
        },
        (err) => {
          console.log("----error in getContextForHierarchyByGroupId----", err);
        }
      );
  }

  getContextValues(contextId) {
    //  this.contextService.getContextValueForHierarchy(contextId).subscribe(res=>{
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
      console.log("---selected index---", event.item_id);
      console.log("--selected context--", event.item_text);
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

  createPayload() {
    this.selectedChildValues = [];
    this.listObj2.getDataList().forEach((each) => {
      this.selectedChildValues.push(this.availableValues2[each.item_index]);
    });

    let parentPayload = this.availableContexts1[
      this.selectedContext1.item_index
    ];
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
    console.log("parent payload--", parentPayload);
    console.log("child payload--", childPayload);
    return { parent: parentPayload, child: childPayload };
  }

  createRelation(relationshipForm) {
    console.log("form ref valid--->", relationshipForm.form.valid);
    console.log("--child context--", this.listObj2.getDataList());
    this.submitted = true;
    if (relationshipForm.form.valid && this.listObj2.getDataList().length) {
      const payload: any = this.createPayload();
      let allRequests = [];

      allRequests.push(
        this.contextService.updateContext(payload.parent).toPromise()
      );
      allRequests.push(
        this.contextService.updateContext(payload.child).toPromise()
      );

      Promise.all(allRequests)
        .then((res) => {
          console.log("---res---", res);
          let success = res.every((each) => each && !each.status);
          if (res && res.length && success) {
            console.log("--context updated--", res);
            this.sharedService.showSuccess("Relationship created successfully");
            this.router.navigate(["/manage/context-relationship"]);
          } else {
            console.error("--res--", res);
            this.router.navigate(["/manage/context-relationship"]);
            this.sharedService.showError(
              "Error while creating relationship, please try again later"
            );
          }
        })
        .catch((err) => {
          console.error("--error--", err);
          this.router.navigate(["/manage/context-relationship"]);
          this.sharedService.showError(
            "Error while creating relationship, please try again later"
          );
        });
    } else {
      this.sharedService.showWarning(
        "Fill all the mandatory fields to proceed"
      );
    }
  }

  // showOverview() {
  //   let modal = this.modalService.open(ContextRelationOverviewComponent);
  // }
}
