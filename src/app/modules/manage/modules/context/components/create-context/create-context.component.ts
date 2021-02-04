import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ContextService } from "src/app/core/services/context.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateContext } from "./model/createContext.model";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/core/services/shared.service";
import { ButtonRendererComponent } from "src/app/shared/components/renderer/button-renderer/buttonRenderer";

@Component({
  selector: "app-create-context",
  templateUrl: "./create-context.component.html",
  styleUrls: ["./create-context.component.scss"],
})
export class CreateContextComponent implements OnInit {
  @ViewChild("content", { static: false }) contentModal: TemplateRef<any>;
  addContextPayload: CreateContext;
  language: string = "EN";

  allContextGroup: any;
  selectedGroup: number;

  contextTypeName: any;
  contextDescription: any;

  contextValues: any[] = [];
  contextValuesToAdd: any[] = [
    {
      code: "",
      name: "",
      language: this.language,
    },
  ];

  selectedContextValue: number = -1;

  pageSize: number;
  pageNumber: number;

  //Data specific to aggrid
  frameworkComponents: any;
  columnDefs = [
    {
      headerName: "Context Code",
      field: "code",
      filter: true,
      checkboxSelection: true,
    },
    { headerName: "Context Name", field: "name", filter: true },
    {
      headerName: "Action",
      pinned: "right",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onEdit: this.openAddContextModal.bind(this),
        onDelete: this.removeContextCode.bind(this),
      },
    },
  ];
  rowData: any[] = [];
  gridApi: any;

  constructor(
    private modalService: NgbModal,
    private contextService: ContextService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit() {
    this.getAllContextGroups();
    this.setDefaultContextPayload();
  }

  setDefaultContextPayload() {
    this.addContextPayload = {
      contextCode: "",
      contextGroup: {},
      contextLabels: [],
      entityDescriptions: [],
      contextValues: [],
    };
  }

  // on grid ready
  onGridReady(params) {
    this.gridApi = params.api; // To access the grids API
  }

  setContextValues() {
    if (this.contextValues && this.contextValues.length) {
      this.rowData = [];
      this.contextValues.forEach((each, index) => {
        this.rowData.push({
          name: each.contextValueLabels[0].name,
          code: each.contextValueLabels[0].code,
          index: index,
        });
      });

      this.gridApi.setRowData(this.rowData); // refresh row data
    }
  }

  // open add context code model
  openAddContextModal(content) {
    // this.modalService.open(content, { size: "lg" });
    if (content && content.rowData && content.rowData.index > -1) {
      this.selectedContextValue = content.rowData.index;
      this.contextValuesToAdd = [
        {
          code: content.rowData.code,
          name: content.rowData.name,
          language: this.language,
        },
      ];
    } else {
      this.selectedContextValue = -1;
      this.contextValuesToAdd = [
        {
          code: "",
          name: "",
          language: this.language,
        },
      ];
    }
    this.modalService.open(this.contentModal, { size: "lg" });
  }

  // Get All context Group data
  getAllContextGroups() {
    this.contextService.getAllContextGroupsForDropdown().subscribe(
      (res) => {
        if (res && !res.status && res.length) {
          this.allContextGroup = res;
        } else {
          this.allContextGroup = [];
        }
      },
      (err) => {
        console.error("Error fetching the context groups", err);
        this.sharedService.showError("Error fetching the context groups");
      }
    );
  }

  // Get selected context group value
  getContextGroupValue() {
    this.addContextPayload.contextGroup = this.allContextGroup[
      this.selectedGroup
    ];
  }

  // add context look up context values code
  addContextCode(addContextCodeForm) {
    if (addContextCodeForm && addContextCodeForm.valid) {
      if (this.contextValuesToAdd && this.contextValuesToAdd.length) {
        let toMerge = this.contextValuesToAdd.map((each) => ({
          contextValueCode: each.code,
          contextValueLabels: [each],
        }));

        let atLeastOneDuplicate = toMerge.some((each) =>
          this.isValueDuplicate(each)
        );

        if (!atLeastOneDuplicate) {
          if (this.selectedContextValue > -1) {
            this.contextValues.splice(this.selectedContextValue, 1, toMerge[0]);
          } else {
            this.contextValues = this.contextValues.concat(toMerge);
          }

          this.setContextValues();
          this.contextValuesToAdd = [
            {
              code: "",
              name: "",
              language: this.language,
            },
          ];
          this.modalService.dismissAll();
        } else {
          this.sharedService.showWarning("at least one value is duplicate");
        }
      } else {
        this.sharedService.showWarning("add a value to proceed");
      }
    } else {
      this.sharedService.showWarning("Fill the mandatory fields to proceed");
    }
  }

  isValueDuplicate(object) {
    if (
      object &&
      object.contextValueLabels &&
      object.contextValueLabels.length
    ) {
      let filteredResult = this.contextValues.filter(
        (each, index) =>
          each.contextValueLabels[0].name ===
            object.contextValueLabels[0].name &&
          index !== this.selectedContextValue
      );

      if (filteredResult && filteredResult.length) {
        this.sharedService.showWarning(
          "Context name " +
            object.contextValueLabels[0].name +
            " is already there, please try another"
        );
        return true;
      } else {
        return false;
      }
    } else {
      console.error("payload not formed correctly");
    }
  }

  // delete the selected context code row data
  removeContextCode(content) {
    if (content && content.rowData && content.rowData.index > -1) {
      if (this.contextValues && this.contextValues.length > 1) {
        this.contextValues.splice(content.rowData.index, 1);
        this.setContextValues();
      } else {
        this.sharedService.showWarning("At least one value is required");
      }
    }
  }

  // create add context payload
  createContextPayload() {
    const payload = {
      contextCode: this.contextTypeName,
      contextGroup: this.allContextGroup[this.selectedGroup],
      contextLabels: [
        {
          name: this.contextTypeName,
          code: "",
          language: this.language,
        },
      ],
      entityDescriptions: [
        {
          name: this.contextDescription,
          code: "",
          language: this.language,
        },
      ],
      contextValues: this.contextValues,
    };
    return payload;
  }

  createContext(addContextForm) {
    console.log("---contextValues---", this.contextValues);
    console.log("--duplicateInCurrent--", this.duplicateInCurrent());
    if (this.duplicateInCurrent()) {
      this.sharedService.showWarning(
        "Duplicate values added, please check & try again"
      );
    } else {
      if (addContextForm && addContextForm.valid) {
        if (this.contextValues && this.contextValues.length) {
          const payload = this.createContextPayload();
          console.log("--payload--", payload);
          this.contextService.createContext(payload).subscribe(
            (res) => {
              if (res && !res.status) {
                console.info("context created successfully", res);
                this.sharedService.showSuccess(
                  "Context added successfully",
                  "Success"
                );
                this.router.navigate(["/manage/context"]);
              } else {
                this.sharedService.showError(
                  "Error while adding new context, please try again later"
                );
              }
            },
            (err) => {
              console.error("error while creating context", err);
              this.sharedService.showError("Failed to add context", "Failed");
              this.router.navigate(["/manage/context"]);
            }
          );
        } else {
          this.sharedService.showWarning("Add a context value to proceed");
        }
      } else {
        this.sharedService.showWarning("Fill the mandatory fields to proceed");
      }
    }
  }

  checkDuplicateContextName(addContextForm) {
    if(addContextForm && addContextForm.valid){
      this.contextService
      .checkContextName(
        this.contextTypeName,
        this.allContextGroup[this.selectedGroup].id
      )
      .subscribe(
        (res) => {
          if (res && !res.status) {
            console.info("already there", res);
            this.sharedService.showWarning(
              "Context name is already there, please try another"
            );
          } else {
            console.info("not there", res);
            this.createContext(addContextForm);
          }
        },
        (err) => {
          console.error("--error while checking context name check--", err);
          this.sharedService.showError(
            "Something went wrong, please try again later"
          );
        }
      );
    }
    else {
      this.sharedService.showWarning("Fill the mandatory fields to proceed");
    }
  }

  addContextValue() {
    let item = {
      code: "",
      name: "",
      language: this.language,
    };
    this.contextValuesToAdd.push(item);
  }

  removeContextValue(i) {
    this.contextValuesToAdd.splice(i, 1);
  }

  closeModal(status) {
    this.modalService.dismissAll();
    this.contextValuesToAdd = [
      {
        code: "",
        name: "",
        language: this.language,
      },
    ];
  }

  duplicateInCurrent() {
    let totalDuplicates: number = 0;
    for (let i = 0; i < this.contextValues.length; i++) {
      for (let j = i - 1; j > -1; j--) {
        if (
          this.contextValues[j].contextValueLabels[0].name ==
          this.contextValues[i].contextValueLabels[0].name
        ) {
          totalDuplicates++;
          console.log(
            "---compared---",
            this.contextValues[j].contextValueLabels[0].name +
              "@ " +
              j +
              "--with--",
            this.contextValues[i].contextValueLabels[0].name + "@ " + i
          );
        }
      }
    }
    console.log("--totalDuplicates--", totalDuplicates);
    return totalDuplicates;
  }
}
