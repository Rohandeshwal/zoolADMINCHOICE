import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  TemplateRef,
} from "@angular/core";
import { ContextType } from "./model/contextType.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ContextService } from "src/app/core/services/context.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedService } from "src/app/core/services/shared.service";
import { ButtonRendererComponent } from "src/app/shared/components/renderer/button-renderer/buttonRenderer";
import {
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: "app-edit-context",
  templateUrl: "./edit-context.component.html",
  styleUrls: ["./edit-context.component.scss"],
})
export class EditContextComponent implements OnInit {
  @ViewChild("content", { static: false }) contentModal: TemplateRef<any>;
  @ViewChild("editContextForm", { static: false }) editForm: any;
  pageNumber: number;
  pageSize: number = 5;
  //Data specific to aggrid
  gridAPI: GridApi;
  frameworkComponents: any;
  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: "infinite",
    cacheBlockSize: this.pageSize,
    paginationPageSize: this.pageSize,
  };
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

  selectedGroup: number;
  allGroupContextGroup: any;
  language: string = "EN";
  matchContexts: any[] = [
    {
      question: "",
      answers: "",
    },
  ];
  selectedContext: ContextType = {
    contextCode: "",
    contextGroup: {},
    contextLabels: [{ name: "", code: "", language: this.language }],
    entityDescriptions: [{ name: "", code: "", language: this.language }],
    contextValues: [
      {
        contextValueLabels: [
          {
            name: "",
            code: "",
            language: this.language,
          },
        ],
      },
    ],
  };

  contextValue: any;
  selectedContextValue: number = -1;
  contextId: any;
  contextValuesToAdd: any[] = [
    {
      code: "",
      name: "",
      language: this.language,
    },
  ];

  constructor(
    private modalService: NgbModal,
    private contextService: ContextService,
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }

  ngOnInit() {
    this.getAllContextGroups();
    this.getContextById();
  }

  // on grid ready
  onGridReady(params) {
    this.gridAPI = params.api; // To access the grids API
    this.gridAPI.sizeColumnsToFit();
    this.gridAPI.setDatasource(this.dataSource);
  }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.pageNumber = params.endRow / this.pageSize;
      this.getContextValues().subscribe((data) => {
        console.log("--data--- from values---", data);
        let modifiedData = [];
        if (data && !data.status && data.content && data.content.length) {
          data.content.forEach((each, index) => {
            modifiedData.push({
              name: each.contextValueLabels[0].name,
              code: each.contextValueLabels[0].code,
              index: index,
              id: each.id,
            });
          });
        }
        params.successCallback(modifiedData, data.totalElements);
      });
    },
  };

  updateDataSource() {
    this.gridAPI.setDatasource(this.dataSource);
  }

  displayAsHTML(params) {
    return params.value ? params.value : "";
  }

  getContextById() {
    this.activatedRoute.params.subscribe((res) => {
      this.contextId = res.id;
      console.log("---res--", res);
      this.contextService.getContextById(res.id).subscribe((context) => {
        if (res && !res.status) {
          this.selectedContext = context;
          console.log("---selected context---", context);
          this.getContextDescription(res.id)
          this.selectGroup();
        }
      });
    });
  }
  
  getContextDescription(id){
    this.contextService.getContextDescription(id).subscribe(res=>{
      if(res && !res.status){
        console.log('--selected context for description--',this.selectedContext);
        console.log('--desc-- found--',res);
        this.selectedContext.entityDescriptions = [res];
      }
      else{
        console.info('Error while loading the descriptions',res);        
        this.sharedService.showWarning('Error while loading the descriptions');
      }
    },err=>{
      console.error('Error while loading the descriptions',err);
      this.sharedService.showError('Error while loading the descriptions');
    })
  }

  //NEW
  getContextValues() {
    return this.contextService.getContextValueById(
      this.contextId,
      this.pageNumber,
      this.pageSize
    );
  }

  selectGroup() {
    if (this.selectedContext && this.selectedContext.contextGroup) {
      if (this.allGroupContextGroup && this.allGroupContextGroup.length) {
        this.allGroupContextGroup.forEach((element, index) => {
          if (element.id === this.selectedContext.contextGroup.id) {
            this.selectedGroup = index;
          }
        });
      }
    }
  }

  // open add context code model
  openAddContextModal(content) {
    console.log("--modal", this.contentModal);
    console.log("---content---", content);
    // console.log("---selected index--", index);
    if (content && content.rowData && content.rowData.index > -1) {
      console.log("--content", content.rowData.index);
      this.selectedContextValue = content.rowData.index;
      this.getContextValueForEdit(content.rowData.id);
      // this.contextValue = this.selectedContext.contextValues[
      //   content.rowData.index
      // ];
    } else {
      this.selectedContextValue = -1;
      this.contextValuesToAdd = [
        {
          contextValueCode: "",
          contextValueLabels: [
            {
              name: "",
              code: "",
              language: this.language,
            },
          ],
        },
      ];
    }

    // console.log("---contextValues--", this.contextValue);
    this.modalService.open(this.contentModal, { size: "lg" });
  }

  getContextValueForEdit(id) {
    this.contextService.getContextValueForEdit(id).subscribe(
      (res) => {
        console.log("---res----", res);
        if (res && !res.status) {
          this.contextValue = res;
          this.contextValuesToAdd = [res];
        }
      },
      (err) => {
        console.error("--err---", err);
      }
    );
  }

  // Get All context Group data
  getAllContextGroups() {
    this.contextService.getAllContextGroupsForDropdown().subscribe(
      (res) => {
        if (res && !res.status && res.length) {
          this.allGroupContextGroup = res;
          this.selectGroup();
        }
      },
      (err) => {
        console.log("===================", err);
      }
    );
  }

  // Get selected context group value
  getContextGroupValue() {
    this.selectedContext.contextGroup = this.allGroupContextGroup[
      this.selectedGroup
    ];
  }

  // add context look up context values code
  addContextCode(updateContextCodeForm) {
    console.log("--addContextCode--", this.contextValuesToAdd);
    console.log(
      "----updateContextCodeForm dirty----",
      updateContextCodeForm.dirty
    );
    if (updateContextCodeForm.dirty) {
      if (updateContextCodeForm && updateContextCodeForm.valid) {
        let duplicateValue = this.contextValuesToAdd.some(
          (each) => each.duplicate
        );
        if (duplicateValue) {
          this.sharedService.showWarning(
            "One or more duplicate values present, change them & try again"
          );
        } else {
          if (this.selectedContextValue > -1) {
            this.updateContextValue();
          } else {
            if (this.duplicateInCurrent()) {
              this.sharedService.showWarning(
                "Duplicate values in current form"
              );
            } else {
              console.log(
                "---editform--",
                this.editForm.form.controls.contextTypeName.dirty
              );
              this.createContextValue();
            }
            console.log("--create context value--", this.contextValuesToAdd);
          }
        }
      } else {
        this.sharedService.showWarning("Fill the mandatory fields to proceed");
      }
    } else {
      this.sharedService.showWarning("Nothing to save");
    }
  }

  createContextValue() {
    console.log("--editForm--", this.editForm.form);
    if (this.editForm.form.valid) {
      console.log("go ahead with --", this.contextValuesToAdd);
      const payload = JSON.parse(JSON.stringify(this.selectedContext));
      payload.contextValues = this.contextValuesToAdd;
      payload.contextValues.forEach((each) => {
        each.contextValueCode = each.contextValueLabels[0].code;
      });
      this.checkDuplicateContextName(this.editForm.form, payload);
      // this.updateContext();
    } else {
      this.sharedService.showWarning(
        "Fill all the mandatory details for context to proceed"
      );
    }
  }

  updateContextValue() {
    if (this.contextValuesToAdd && this.contextValuesToAdd.length) {
      this.contextService
        .updateContextValue(this.contextValuesToAdd[0])
        .subscribe(
          (res) => {
            if (res && !res.status) {
              this.sharedService.showSuccess("Value updated successfully");
              this.updateDataSource();
              this.modalService.dismissAll();
            } else {
              console.error("--error while updating context--", res);
              this.sharedService.showError(
                "Error while updating context value"
              );
            }
          },
          (err) => {
            console.error("--error while updating context--", err);
            this.sharedService.showError("Error while updating context value");
          }
        );
    } else {
      this.sharedService.showWarning("Nothing to update");
    }
  }

  duplicateInCurrent() {
    let totalDuplicates: number = 0;
    for (let i = 0; i < this.contextValuesToAdd.length; i++) {
      for (let j = i - 1; j > -1; j--) {
        if (
          this.contextValuesToAdd[j].contextValueLabels[0].name ==
          this.contextValuesToAdd[i].contextValueLabels[0].name
        ) {
          totalDuplicates++;
          console.log(
            "---compared---",
            this.contextValuesToAdd[j].contextValueLabels[0].name +
              "@ " +
              j +
              "--with--",
            this.contextValuesToAdd[i].contextValueLabels[0].name + "@ " + i
          );
        }
      }
    }
    console.log("--totalDuplicates--", totalDuplicates);
    return totalDuplicates;
  }

  checkDuplicateContextValue(item) {
    this.contextService
      .checkContextValue(
        this.selectedContext.id,
        item.contextValueLabels[0].name
      )
      .subscribe(
        (res) => {
          console.log("--res--duplicate check---", res);
          if (res && !res.status) {
            item.duplicate = true;
          } else {
            item.duplicate = false;
          }
        },
        (err) => {
          console.error("---error--", err);
        }
      );
  }

  isValueDuplicate(object) {
    if (
      object &&
      object.contextValueLabels &&
      object.contextValueLabels.length
    ) {
      let filteredResult = this.selectedContext.contextValues.filter(
        (each, index) =>
          each.contextValueLabels[0].name ===
            object.contextValueLabels[0].name &&
          index !== this.selectedContextValue
      );
      console.log("----filtered list---", filteredResult);
      if (filteredResult && filteredResult.length) {
        return true;
      } else {
        return false;
      }
    } else {
      this.sharedService.showError("---payload not formed correctly");
    }
  }

  // delete the selected context code row data
  removeContextCode(content) {
    console.log("--remove this--", content);
    if (
      this.selectedContext.contextValues &&
      this.selectedContext.contextValues.length > 1
    ) {
      let deleteModal = this.modalService.open(DeleteConfirmationComponent, {});
      deleteModal.componentInstance.status.subscribe((res) => {
        console.log("--delete modal--", res);
        if (res) {
          if (content && content.rowData && content.rowData.id) {
            this.contextService.deleteContextValue(content.rowData.id).subscribe(
              (res) => {
                if (!res) {
                  console.info("deleted successfully", res);
                  this.sharedService.showSuccess("Deleted successfully");
                  this.getContextById();
                  this.updateDataSource();
                } else {
                  this.sharedService.showError("Error while deleting the value");
                  this.getContextById();
                  this.updateDataSource();
                  console.error("error while deleting the value", res);
                }
              },
              (err) => {
                this.sharedService.showError("Error while deleting the value");
                this.getContextById();
                this.updateDataSource();
                console.error("error while deleting the value", err);
              }
            );
          } else {
            if (content && content.rowData && content.rowData.index > -1) {
              //local remove
              this.selectedContext.contextValues.splice(content.rowData.index, 1);
            }
          }
        }});
    } else {
      this.sharedService.showWarning("At least one value is required");
    }
  }

  updateContext(editContextForm, payload?) {
    if (editContextForm && editContextForm.valid) {
      if (payload) {
        this.contextService.updateContext(payload).subscribe(
          (res) => {
            if (res && !res.status) {
              console.info("context values added successfully", res);
              this.sharedService.showSuccess(
                "Context values added successfully",
                "Success"
              );
              this.updateDataSource();
              this.getContextById();
              this.modalService.dismissAll();
            } else {
              console.error("error while creating context", res);
              this.sharedService.showError(
                "Failed to add context values, please try again"
              );
              this.modalService.dismissAll();
              this.updateDataSource();
            }
          },
          (err) => {
            console.error("error while creating context", err);
            this.sharedService.showError(
              "Failed to add context values, please try again"
            );
            this.modalService.dismissAll();
            this.updateDataSource();
          }
        );
      } else if (this.selectedContext) {
        const payload = this.selectedContext;
        delete payload.contextValues;
        this.contextService.updateContext(this.selectedContext).subscribe(
          (res) => {
            if (res && !res.status) {
              console.info("context updated successfully", res);
              this.sharedService.showSuccess(
                "Context updated successfully",
                "Success"
              );
              this.router.navigate(["/manage/context"]);
            } else {
              console.error("error while creating context", res);
              this.sharedService.showError(
                "Failed to update context",
                "Failed"
              );
              this.router.navigate(["/manage/context"]);
            }
          },
          (err) => {
            console.error("error while creating context", err);
            this.sharedService.showError("Failed to update context", "Failed");
            this.router.navigate(["/manage/context"]);
          }
        );
      }
    } else {
      this.sharedService.showWarning("Fill the mandatory fields to proceed");
    }
  }

  checkDuplicateContextName(editContextForm, payload?) {
    if(editContextForm && editContextForm.valid){
      if (this.editForm.form.controls.contextTypeName.dirty) {
        this.contextService
          .checkContextName(
            this.selectedContext.contextLabels[0].name,
            this.selectedContext.contextGroup.id
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
                this.updateContext(editContextForm, payload);
              }
            },
            (err) => {
              console.error("--error while checking context name check--", err);
              this.sharedService.showError(
                "Something went wrong, please try again later"
              );
            }
          );
      } else {
        this.updateContext(editContextForm, payload);
      }
    }
    else{
      this.sharedService.showWarning("Fill the mandatory fields to proceed");
    }
  }

  addContextValue() {
    let item = {
      contextValueCode: "",
      contextValueLabels: [
        {
          name: "",
          code: "",
          language: this.language,
        },
      ],
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
        contextValueCode: "",
        contextValueLabels: [
          {
            name: "",
            code: "",
            language: this.language,
          },
        ],
      },
    ];
  }
}
