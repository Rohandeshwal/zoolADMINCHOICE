import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BusinessService } from "src/app/core/services/business.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SharedService } from "src/app/core/services/shared.service";
import { BusinessRelationService } from "src/app/core/services/business-relation.service";

@Component({
  selector: "app-edit-relationship-table-form",
  templateUrl: "./edit-relationship-table-form.component.html",
  styleUrls: ["./edit-relationship-table-form.component.scss"],
})
export class EditRelationshipTableFormComponent implements OnInit {
  public toolbar = {};
  showColumn2: boolean;
  showColumn3: boolean;
  showColumn4: boolean;
  showColumn5: boolean;
  relationTypeData: any[] = [];
  hierarchyData: any[];
  constructor(
    private router: Router,
    private businessService: BusinessService,
    private modalService: NgbModal,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private businessRelationService: BusinessRelationService
  ) { }

  ngOnInit(): void {
    this.getAllBusinessRelationData();
  }

  // get all Business Components data
  getAllBusinessRelationData() {
    this.businessRelationService.getAllBusinessRelationType().subscribe(data => {
      if (data && data.content && data.content.length) {
        data.content.forEach(element => {
          this.relationTypeData.push({
            name: element.relationLabels[0].name,
            data: element,
            relationTypeId: element.id
          })
        });
      } else {
        this.sharedService.showInfo("No Data");
      }
    }, (err => {
      this.sharedService.showError("Error to get Modules");
    }));;
  }

  // on back 
  onBack() {
    this.router.navigate(['manage/business-component-relationship/list']);
  }

  // get relation type data
  getRelationData(event) {
    const id = event.target.value;
    this.selectedRelationTypeId(id)
  }

  // select relation type id data
  selectedRelationTypeId(id) {
    // let selectedData = this.relationTypeData.find(x => x.relationTypeId === id);
    // this.selectedRelationTypeData = {
    //   "version": selectedData.data.version,
    //   "deleteAllowed": selectedData.data.deleteAllowed,
    //   "id": selectedData.data.id
    // }
  }
}
