import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessService } from 'src/app/core/services/business.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-add-to-module',
  templateUrl: './add-to-module.component.html',
  styleUrls: ['./add-to-module.component.scss']
})
export class AddToModuleComponent implements OnInit {
  hierarchyData: any[];
  selectHierarchyRelationId: any;
  selectLeastModuleId: any;
  leastModules: any[];
  allLeastModules: any[];
  busCompVersion: any;
  busCompId: any;
  relationArray = [
    {
      "parentId": "",
      "businessComponentRelations": [
        {
          "businessComponents": [
            {
              "version": 0,
              "id": ""
            }
          ]
        }
      ]
    }
  ]
  finalRelationData: any[] = [];
  fieldArray: Array<number> = [0];
  @ViewChildren("selectModule") moduleSelect: QueryList<ElementRef<HTMLSelectElement>>;
  selectedModules = new Set<string>();

  constructor(private router: Router, private businessService: BusinessService, private modalService: NgbModal,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute) {

  }

  compList = []
  ngOnInit() {
    this.getSelectBusCompData();
    this.getHierarchiesForBusinessComponent();
  }

  getSelectBusCompData() {
    this.activatedRoute.queryParams.subscribe(res => {
      if (res) {
        this.busCompVersion = res.version;
        this.busCompId = res.busComId;
      }
    });
  }

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

  mapHierarchyData(hierarchy) {
    this.hierarchyData = [];
    hierarchy.forEach(each => {
      this.hierarchyData.push({
        hierarchyId: each.id,
        relationId: each.hierarchyRelations[0].id,
        hierarchyName: each.hierarchyRelations[0].modules[0].moduleLabels[0].name
      })
    });
  }

  // select hierarchy Data
  selectHierarchyData() {
    this.getLeastModulesForBusinessComponent();
  }

  // get least modules for business component 

  getLeastModulesForBusinessComponent() {
    this.leastModules = [];
    this.allLeastModules = [];
    this.businessService.getLeastModulesForBusinessComponent(this.selectHierarchyRelationId, this.busCompId).subscribe(
      res => {
        if (res && res.length) {
          this.allLeastModules = res;
          res.forEach(element => {
            if (element.modules && element.modules.length) {
              this.leastModules.push({
                id: element.id,
                name: element.modules[0].moduleLabels[0].name
              });
            }

          });
        }
      },
      err => {
        this.sharedService.showError("Fetching in modules");
      }
    )
  }

  selected() {
    this.selectedModules.clear();
    console.log(this.moduleSelect)
    this.moduleSelect.forEach(ls => {
      const selectedVal = ls.nativeElement.value;
      if (selectedVal && selectedVal !== "undefined") this.selectedModules.add(selectedVal);
    });

    this.selectedModules.forEach(sl => {
      console.log(`selected module -> ${sl}`);
    });
  }

  addFieldValue() {
    this.fieldArray.push(this.fieldArray.length);
  }

  deleteFieldValue(index: number, module: string) {
    this.selectedModules.delete(module);
    this.fieldArray.splice(index, 1);
  }

  isSelected(module: string) {
    return this.selectedModules.has(module);
  }

  getSelectedModules() {
    let data = Array.from(this.selectedModules);
    if (data && data.length) {
      data.forEach(id => {
        this.selectLeastModule(id)
      })
    }
  }

  // select module for business component addition 
  selectLeastModule(moduleId) {
    let data = this.allLeastModules.find(x => x.id === moduleId);
    this.createRelationObj(data);
  }

  // create relation object
  createRelationObj(data) {
    this.relationArray[0].parentId = data.parentId;
    this.relationArray[0].businessComponentRelations[0].businessComponents[0].version = parseInt(this.busCompVersion);
    this.relationArray[0].businessComponentRelations[0].businessComponents[0].id = this.busCompId;
    delete data.modules[0].images;
    data.relations = this.relationArray;
    this.finalRelationData.push(data);
  }

  addBusCompToModule() {
    this.getSelectedModules();
    console.log(this.finalRelationData)
    if (this.finalRelationData && this.finalRelationData.length) {
      this.businessService.addBulkBusinessComponents(this.finalRelationData).subscribe(res => {
        this.router.navigate(['manage/business-component/list'])
      }, (err => {
        this.sharedService.showError("while adding business component");
      }))
    } else {
      this.sharedService.showError("Please fill mandatory fields");
    }
  }

}
