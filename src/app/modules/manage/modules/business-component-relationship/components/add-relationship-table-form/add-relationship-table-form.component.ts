import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessService } from 'src/app/core/services/business.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/core/services/shared.service';
import { BusinessRelationService } from 'src/app/core/services/business-relation.service';

@Component({
  selector: "app-add-relationship-table-form",
  templateUrl: "./add-relationship-table-form.component.html",
  styleUrls: ["./add-relationship-table-form.component.scss"],
})
export class AddRelationshipTableFormComponent implements OnInit {
  showColumn2: boolean;
  showColumn3: boolean;

  public groupA: { [key: string]: Object }[] = [
    { name: "Australia", code: "AU" },
    { name: "Bermuda", code: "BM" },
    { name: "Canada", code: "CA" }
  ];
  public setField = {
    text: "name",
  };
  hierarchyData: any[];

  public toolbar = {};

  showModuleList1: boolean;
  showModuleList2: boolean;

  showBusinessCompList1: boolean;
  showBusinessCompList2: boolean;

  showHierarchy2: boolean;
  selectModuleData: any[];
  businessComponentData: any[] = [];
  showColumn4: boolean;
  selectModuleRow2Data: any[];
  businessComponentRow2Data: any[];
  showColumn5: boolean;
  relationTypeData: any[] = [];
  relationDescription: any;

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
  businessRelationFirstData: any;
  businessRelationSecondData: any;
  selectedRelationTypeData: { version: number; deleteAllowed: boolean; id: string; };


  constructor(private router: Router, private businessService: BusinessService, private modalService: NgbModal,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute, private businessRelationService: BusinessRelationService) { }

  ngOnInit() {
    this.getHierarchiesForBusinessComponent();
    this.getAllBusinessRelationData();
  }

  onSelectHierarchy1() {
    this.showModuleList1 = true;
  }

  onSelectModule1() {
    this.showBusinessCompList1 = true;
  }

  onSelectBusinessComp1() {
    this.showHierarchy2 = true;
  }

  onSelectBusinessComp2() { }

  onSelectHierarchy2() {
    this.showModuleList2 = true;
  }

  onSelectModule2() {
    this.showBusinessCompList2 = true;
  }


  // get all Hierarchies for business components 
  getHierarchiesForBusinessComponent() {
    this.businessService.getHierarchiesForBusinessComponent().subscribe(
      res => {
        if (res && res.length) {
          this.mapHierarchyData(res)
        }
      },
      err => {
        this.sharedService.showError("Fetching in Hierarchies");
      }
    )
  }

  // map the Hierarchies object for UI
  mapHierarchyData(hierarchy) {
    this.hierarchyData = [];
    hierarchy.forEach(each => {
      this.hierarchyData.push({
        code: each.id,
        relationId: each.hierarchyRelations[0].id,
        name: each.hierarchyRelations[0].modules[0].moduleLabels[0].name
      })
    });
  }

  // on selection changes for first of business relation 
  onChange(event, action) {
    switch (action) {
      case "column1":
        this.getColumn12Data(event);
        break;
      case "column2":
        this.getColumn13Data(event);
        break;
      case "column3":
        this.getBusinessComponentFirstData(event)
        break;
      case "column4":
        this.getColumn22Data(event);
        break;
      case "column5":
        this.getColumn23Data(event);
        break;
      case "column6":
        this.getBusinessComponentSecondData(event)
        break;
      default:
        break;
    }
  }

  // get Modules for Business components 
  getModulesForBusinessComponents(relationId) {
    return this.businessRelationService.getModulesForBusinessComponents(relationId);
  }
  // get child Business components 
  getChildForBusinessComponents(relationId) {
    return this.businessRelationService.getChildForBusinessComponents(relationId);
  }

  // get Block 12 data
  getColumn12Data(event) {
    if (event && event.items && event.items.length) {
      this.getModulesForBusinessComponents(event.items[0].relationId).subscribe(data => {
        if (data && data.length) {
          this.showColumn2 = true;
          this.selectModuleData = this.mapModulesData(data);
        } else {
          this.sharedService.showInfo("No Data");
        }
      }, (err => {
        this.sharedService.showError("Error to get Modules");
      }));
    }
  }
  // get column 13 data
  getColumn13Data(event) {
    if (event && event.items && event.items.length) {
      this.getChildForBusinessComponents(event.items[0].relationId).subscribe(data => {
        if (data && data.length) {
          this.showColumn3 = true;
          this.businessComponentData = this.mapBusinessComponentData(data);
        } else {
          this.sharedService.showInfo("No Data");
        }
      }, (err => {
        this.sharedService.showError("Error to get Modules");
      }));
    }
  }
  // get column 22 module data
  getColumn22Data(event) {
    if (event && event.items && event.items.length) {
      this.getModulesForBusinessComponents(event.items[0].relationId).subscribe(data => {
        if (data && data.length) {
          this.showColumn4 = true;
          this.selectModuleRow2Data = this.mapModulesData(data);
        } else {
          this.sharedService.showInfo("No Data");
        }
      }, (err => {
        this.sharedService.showError("Error to get Modules");
      }));
    }
  }
  // get column 13 data
  getColumn23Data(event) {
    if (event && event.items && event.items.length) {
      this.getChildForBusinessComponents(event.items[0].relationId).subscribe(data => {
        if (data && data.length) {
          this.showColumn5 = true;
          this.businessComponentRow2Data = this.mapBusinessComponentData(data);
        } else {
          this.sharedService.showInfo("No Data");
        }
      }, (err => {
        this.sharedService.showError("Error to get Modules");
      }));
    }
  }

  // common module data mapping for UI according component 
  mapModulesData(data) {
    let modulesData = [];
    data.forEach(element => {
      if (element && element.modules) {
        modulesData.push({
          name: element.modules[0].moduleLabels[0].name,
          relationId: element.id
        })
      }
    });
    return modulesData;
  }

  // common business component  data mapping for UI according component 
  mapBusinessComponentData(data) {
    let businessComponentData = [];
    data.forEach(element => {
      if (element && element.relations && element.relations.length) {
        businessComponentData.push({
          name: element.relations[0].businessComponentRelations[0].businessComponents[0].businessComponentLabels[0].name,
          relationId: element.id,
          relations: element.relations,
          parentId: element.parentId
        })
      }
    });
    return businessComponentData;
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

  // get relation type data
  getRelationData(event) {
    const id = event.target.value;
    this.selectedRelationTypeId(id)
  }

  // select relation type id data
  selectedRelationTypeId(id) {
    let selectedData = this.relationTypeData.find(x => x.relationTypeId === id);
    this.selectedRelationTypeData = {
      "version": selectedData.data.version,
      "deleteAllowed": selectedData.data.deleteAllowed,
      "id": selectedData.data.id
    }
    console.log(this.selectedRelationTypeData)
  }
  // get business component first data
  getBusinessComponentFirstData(data) {
    this.businessRelationFirstData = this.mappedBusinessComponentData(data.items[0]);
  }
  // get business component second data
  getBusinessComponentSecondData(data) {
    this.businessRelationSecondData = this.mappedBusinessComponentData(data.items[0]);
  }

  // get Data according to the UI
  mappedBusinessComponentData(data) {
    if (data && data.relations && data.relations.length) {
      let relationData: any = data.relations[0];
      if (relationData.businessComponentRelations && relationData.businessComponentRelations.length) {
        let businessComponentData = relationData.businessComponentRelations[0];
        if (businessComponentData.businessComponents && businessComponentData.businessComponents.length) {
          let finalMapData = businessComponentData.businessComponents[0];
          delete finalMapData.businessComponentLabels;
          delete finalMapData.images;
          return businessComponentData;
        }
      }
    }
  }

  // on click on save
  onSave() {
    if (this.businessRelationFirstData) {
      if (this.businessRelationSecondData) {
        if (this.selectedRelationTypeData && this.selectedRelationTypeData.id) {
          this.createRelationPayload()
        } else {
          this.sharedService.showError("Please Select Business Relationship type");
        }

      } else {
        this.sharedService.showError("Please Select Business component from row two");
      }

    } else {
      this.sharedService.showError("Please Select  Business component from row one");
    }
  }
  createRelationPayload() {
    let mappedWithRelationType = {
      businessComponentRelations: []
    }
    mappedWithRelationType.businessComponentRelations.push(this.businessRelationSecondData);
    mappedWithRelationType.businessComponentRelations[0].relationType = this.selectedRelationTypeData
    this.businessRelationFirstData.businessComponentRelations = mappedWithRelationType.businessComponentRelations;

    this.businessRelationService.createBusinessComponentRelation(this.businessRelationFirstData).subscribe(data => {
      this.router.navigate(['manage/business-component-relationship/list'])
    }, (err => {
      this.sharedService.showError("While creating relation of Business components");
    }));;
  }
}
