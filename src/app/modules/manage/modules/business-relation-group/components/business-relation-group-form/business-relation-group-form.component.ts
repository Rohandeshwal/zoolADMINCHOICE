import { Component, OnInit } from '@angular/core';
import { BusinessRelationService } from 'src/app/core/services/business-relation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-business-relation-group-form',
  templateUrl: './business-relation-group-form.component.html',
  styleUrls: ['./business-relation-group-form.component.scss']
})
export class BusinessRelationGroupFormComponent implements OnInit {
  relationName: any;


  relationObj = {
    "relationCode": "",
    "relationLabels": [
      {
        "name": "",
        "code": "",
        "language": "EN"
      }
    ]
  }
  mode: string;
  relationGroupData: any;
  constructor(private businessRelationService: BusinessRelationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,) { }

  ngOnInit() {
    this.getCurrentModuleId();
  }

  // get module id from params
  getCurrentModuleId() {
    this.activatedRoute.params.subscribe(
      (res) => {
        if (res && res.businessGroupId) {
          this.mode = "edit";
          this.getCurrentGroupData(res.businessGroupId);
        } else {
          this.mode = "add";
        }
      }
    );
  }
  getCurrentGroupData(businessGroupId) {
    this.businessRelationService.getRelationTypeById(businessGroupId).subscribe(
      (res) => {
        console.log(res)
        if (res && res.relationLabels && res.relationLabels.length) {
          this.relationName = res.relationLabels[0].name;
          this.relationGroupData = res;
        }
      },
      (err) => {
        this.sharedService.showError('Error to fetching  Business group ');
      }
    );
  }

  // create payload depend on  mode 
  onSubmit(relationForm) {
    if (relationForm.form.valid) {
      if (this.mode === 'add') {
        this.addBusinessRelationType();
      }
      if (this.mode === 'edit') {
        this.relationGroupData.relationLabels[0].name = this.relationName;
        console.log(this.relationGroupData)
        this.updateBusinessRelationType();
      }
    } else {
      this.sharedService.showError("Mandatory Field are required");
    }
  }
  // on back
  onBack() {
    this.router.navigate(['manage/business-relations-group/list'])
  }
  addBusinessRelationType() {
    this.relationObj.relationLabels[0].name = this.relationName;
    this.businessRelationService.createRelationType(this.relationObj).subscribe((res) => {
      if (res) {
        this.sharedService.showSuccess("Business relation group added  successfully");
        this.router.navigate(['manage/business-relations-group/list'])
      } else {
        this.sharedService.showError("Error while adding");
      }

    }, (err) => {
      this.sharedService.showError("Error while adding");
    })
  }
  updateBusinessRelationType() {
    this.businessRelationService.updateRelationType(this.relationGroupData).subscribe((res) => {
      if (res) {
        this.sharedService.showSuccess("Business relation group updated  successfully");
        this.router.navigate(['manage/business-relations-group/list'])
      } else {
        this.sharedService.showError("Error while updating");
      }

    }, (err) => {
      this.sharedService.showError("Error while updating");
    })
  }

}
