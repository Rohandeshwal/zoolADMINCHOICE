import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedService } from "src/app/core/services/shared.service";
import { ContextService } from "src/app/core/services/context.service";

@Component({
  selector: "app-add-context-group-form",
  templateUrl: "./add-context-group-form.component.html",
  styleUrls: ["./add-context-group-form.component.scss"],
})
export class AddContextGroupFormComponent implements OnInit {
  language: string = "EN";
  contextGroup: any;
  groupId: string;
  constructor(
    private contextService: ContextService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.setDefaults();
    this.getGroupById();
  }

  setDefaults() {
    this.contextGroup = {
      name: "",
      code: "",
      language: this.language,
    };
  }

  getGroupById() {
    this.activatedRoute.params.subscribe(
      (res) => {
        if (res) {
          this.groupId = res.id;
          this.getContextGroupById();
        }
      },
      (err) => {
        console.log("--context group by id--> error", err);
      }
    );
  }

  getContextGroupById() {
    this.contextService.getContextGroupById(this.groupId).subscribe(
      (res) => {
        if (res && !res.status) {
          console.log("getContextGroupById-->", res);
          this.contextGroup = res;
        } else {
          this.contextGroup = { name: "", code: "", language: this.language };
          console.log("--context group by id--> error", res);
        }
      },
      (err) => {
        this.contextGroup = { name: "", code: "", language: this.language };
        console.log("getContextGroupById error -->", err);
      }
    );
  }

  createContextGroup(addContextGroupForm) {
    if (addContextGroupForm && addContextGroupForm.dirty) {
      if (addContextGroupForm.valid) {
        this.contextService
          .checkContextGroupName(this.contextGroup.name)
          .subscribe(
            (res) => {
              if (res && !res.status) {
                console.error("duplicate context group name--", res);
                this.sharedService.showError(
                  "Duplicate context group name, please try another"
                );
              } else {
                this.createOrUpdateContextGroup();
              }
            },
            (err) => {
              console.error("error while adding context group--", err);
              this.sharedService.showError(
                "Error while creating context group, please try again later"
              );
            }
          );
      } else {
        this.sharedService.showWarning(
          "Fill all the mandatory fields to proceed"
        );
      }
    } else {
      this.sharedService.showWarning("Nothing to save");
    }
    console.log("---submitted--");
  }

  createOrUpdateContextGroup() {
    if (this.groupId) {
      this.contextService.updateContextGroup(this.contextGroup).subscribe(
        (res) => {
          console.log("response after updating context group", res);
          if (res && !res.status) {
            this.sharedService.showSuccess(
              "Context group updated successfully"
            );
          } else {
            this.sharedService.showError(
              "Error while updated context group, please try again later"
            );
          }
          this.router.navigate(["/manage/context-group/list"]);
        },
        (err) => {
          console.error("error while updating context group--", err);
          this.sharedService.showError(
            "Error while updating context group, please try again later"
          );
        }
      );
    } else {
      this.contextService.createContextGroup(this.contextGroup).subscribe(
        (res) => {
          console.log("response after adding context group", res);
          if (res && !res.status) {
            this.sharedService.showSuccess(
              "Context group created successfully"
            );
          } else {
            this.sharedService.showError(
              "Error while creating context group, please try again later"
            );
          }
          this.router.navigate(["/manage/context-group/list"]);
        },
        (err) => {
          console.error("error while adding context group--", err);
          this.sharedService.showError(
            "Error while creating context group, please try again later"
          );
        }
      );
    }
  }
}
