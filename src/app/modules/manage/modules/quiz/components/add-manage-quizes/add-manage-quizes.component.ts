import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-manage-quizes",
  templateUrl: "./add-manage-quizes.component.html",
  styleUrls: ["./add-manage-quizes.component.scss"]
})
export class AddManageQuizesComponent implements OnInit {
  public Question: String = 'Enter Question here..';
  quiz: any[] = [
    {
      objtype1: "",
      objtype2: ""
    }
  ];
  businessComponent: any[] = [
    {
      title: "Question 1",
      objbusiness1: "",
      objbusiness2: ""
    }
  ];

  ansType: any[] = [
    {
      value: "Yes or No",
    },
    {
      value: "Multiple Choice",
    },
    {
      value: "Single Choice",
    },
    {
      value: "Match the Column",
    }
  ]

  matchColumns: any[] = [
    {
      question: "",
      answers:  ""
    },
  ]

  ansList: any [] = [
    {
      answers: ""
    }
  ]
  activePanel:any;
  selectedAnsType = "Select Answer Type";
  constructor() {}

  ngOnInit() {}
  addContext() {
    let item = {
        question: "",
        answers:  ""
    }
    this.matchColumns.push(item);
  }

  removeContext(i) {
    this.quiz.splice(i, 1);
  }
onSubmit(){
  
}
  addBusinessquiz(ind) {
    this.businessComponent.push({
      title: "Question " + (ind + 1),
      objbusiness1: "",
      objbusiness2: ""
    });
    this.closeOthers(ind);
  }

  removeBusinessquiz(i) {
    this.businessComponent.splice(i, 1);
  }

  closeOthers(i) {
    this.activePanel = i;
  }

  addAns(){
    this.ansList.push({
      answer: ""
    })
  }

  removeAns(index){
   this.ansList.splice(index,1)
  }
}
