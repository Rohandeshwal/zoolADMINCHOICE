import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-study-assessment-rating',
  templateUrl: './case-study-assessment-rating.component.html',
  styleUrls: ['./case-study-assessment-rating.component.scss']
})
export class CaseStudyAssessmentRatingComponent implements OnInit {
  addAssement: any[] = [{
    fromScore:'',
    toScore:'',
    comments:'',
  }];
  constructor() { }

  ngOnInit() {
    
  }
  add(){
    this.addAssement.push({
      fromScore:'',
    toScore:'',
    comments:'',
    }); 
  }
  remove(i){
    this.addAssement.splice(i,1);
  }
}
