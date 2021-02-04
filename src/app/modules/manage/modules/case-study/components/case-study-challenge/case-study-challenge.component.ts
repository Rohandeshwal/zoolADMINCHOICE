import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-case-study-challenge",
  templateUrl: "./case-study-challenge.component.html",
  styleUrls: ["./case-study-challenge.component.scss"]
})
export class CaseStudyChallengeComponent implements OnInit {
  public placeholder: String = 'Enter Comments here..';
  activePanel: any;
  moduleSelected: boolean = false;
  selectedModuleIndex: any;
  selectedParent: any;
  selectedVal: any;
  subModuleSelection: boolean;
  selectedBCName = "Select Business Component";
  modalHeading = "Select Module";
  showSubModule: boolean;
  showBC: boolean;
  questionlist: any[] = [
    {
      title: "Question 1",
      selected: false,
      question: [
        {
          component: [
            {
              bussComp: "Select Business Component"
            }
          ]
        }
      ]
    }
  ];

  
  modules = [
    {
      moduleIcon: "./assets/images/category-individual.svg",
      moduleName: "Brand Strategy"
    },
    {
      moduleIcon: "./assets/images/category-individual.svg",
      moduleName: "VALUE Transaction Types"
    },
    {
      moduleIcon: "./assets/images/category-individual.svg",
      moduleName: "Target Audience"
    },
    {
      moduleIcon: "./assets/images/category-individual.svg",
      moduleName: "VALUE PROPOSITION"
    },
    {
      moduleIcon: "./assets/images/category-individual.svg",
      moduleName: "Business Model"
    },
    {
      moduleIcon: "./assets/images/category-individual.svg",
      moduleName: "Opportunity Design"
    },
    {
      moduleIcon: "./assets/images/category-individual.svg",
      moduleName: "Competitor Strategy"
    },
    {
        moduleIcon: "./assets/images/category-individual.svg",
        moduleName: "Ecosystem Signals Audience"
    },
    {
      moduleIcon: "./assets/images/category-individual.svg",
      moduleName: "Business Constituents"
    },
    {
      moduleIcon: "./assets/images/category-individual.svg",
      moduleName: "Ecosystem Signals"
    },
  ];

  subModules = [
    {
      subModuleIcon: "./assets/images/category-individual.svg",
      subModuleName: "VALUE PROPOSITION"
    },
    {
       subModuleIcon: "./assets/images/category-individual.svg",
       subModuleName: "VALUE Transaction Types"
    },
    {
       subModuleIcon: "./assets/images/category-individual.svg",
       subModuleName: "Target Audience"
    },
    {
       subModuleIcon: "./assets/images/category-individual.svg",
       subModuleName: "Ecosystem Signals Audience"
    },
    {
      subModuleIcon: "./assets/images/category-individual.svg",
      subModuleName: "Business Model"
    },
    {
      subModuleIcon: "./assets/images/category-individual.svg",
      subModuleName: "Opportunity Design"
    },
    {
      subModuleIcon: "./assets/images/category-individual.svg",
      subModuleName: "Competitor Strategy"
    },
    {
      subModuleIcon: "./assets/images/category-individual.svg",
      subModuleName: "Ecosystem Signals"
    },
    {
      subModuleIcon: "./assets/images/category-individual.svg",
      subModuleName: "Brand Strategy"
    },
    {
      subModuleIcon: "./assets/images/category-individual.svg",
      subModuleName: "Business Constituents"
    },
  ];

  businessComp = [
    {
      businessCompIcon: "./assets/images/category-individual.svg",
      businessCompName: "VALUE PROPOSITION"
    },
    {
       businessCompIcon: "./assets/images/category-individual.svg",
       businessCompName: "VALUE Transaction Types"
    },
    {
       businessCompIcon: "./assets/images/category-individual.svg",
       businessCompName: "Target Audience"
    },
    {
       businessCompIcon: "./assets/images/category-individual.svg",
       businessCompName: "Ecosystem Signals Audience"
    },
    {
      businessCompIcon: "./assets/images/category-individual.svg",
      businessCompName: "Business Model"
    },
    {
      businessCompIcon: "./assets/images/category-individual.svg",
      businessCompName: "Opportunity Design"
    },
    {
      businessCompIcon: "./assets/images/category-individual.svg",
      businessCompName: "Competitor Strategy"
    },
    {
      businessCompIcon: "./assets/images/category-individual.svg",
      businessCompName: "Ecosystem Signals"
    },
    {
      businessCompIcon: "./assets/images/category-individual.svg",
      businessCompName: "Brand Strategy"
    },
    {
      businessCompIcon: "./assets/images/category-individual.svg",
      businessCompName: "Business Constituents"
    },
  ];
  selectedBC: any;
  parentInd: any;
  childInd: any;
  subChildInd: any;
  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit() {}
  //accordion
  addAccordion(ind) {
    if(ind < 5){
      this.questionlist.push({
        title: "Question " + (ind + 1),
        selected: false,
        question: [
          {
            component: [
              {
                bussComp: "Select Business Component"
              }
            ]
          }
        ]
      });
    }
    this.closeOthers(ind);
  }
  removeAccordion(ind) {
    this.questionlist.splice(ind, 1);
  }
  closeOthers(i) {
    console.log("drfyhdfrhydfh", i);
    this.activePanel = i;
  }

  addContext(parentInd,childIndex){
    // let bussComp = "Select Business Component";
    this.questionlist[parentInd].question[childIndex].component.push({bussComp: "Select Business Component"});
    console.log(this.questionlist);
    
  }

  openList(modalName,parentInd,childIndex, subChildInd){
    console.log(parentInd,childIndex, subChildInd);
    
    this.parentInd = parentInd;
    this.childInd = childIndex;
    this.subChildInd = subChildInd;
    this.modalService.open(modalName);
  }

  selectModule(module){
    // this.selectedModuleIndex = index;
    this.showSubModule = true;
    this.modalHeading = "Select Sub Module";
  }

  selectSubModule(submodule){
    this.showSubModule = false;
    this.showBC = true;
    this.modalHeading = "Select Business Components";
  }

  selectBCs(businessComp){
    console.log(businessComp, "selected BCs");
    this.selectedBC = businessComp;
  }
  subModuleSelected(modalName){
    this.modalService.dismissAll(modalName);
    this.questionlist[this.parentInd].question[this.childInd].component[this.subChildInd].bussComp = this.selectedBC.businessCompName;
  //   switch (this.selectedVal) {
  //     case 'moduleSelection':    
  //       this.questionlist[this.selectedParent].selected = true;   
  //       this.selectedBCName = this.subModules[index].subModuleName;
  //       break;
  //     case 'subModuleSelection':
  //       this.subModuleSelection = true;
  //       this.subModuleSelectedName = this.subModules[index].subModuleName;
  //       break;
  //     case 'bcSelection':
  //       this.selectedBCName = this.subModules[index].subModuleName;
  //       break;
  //   } 
  }
}
