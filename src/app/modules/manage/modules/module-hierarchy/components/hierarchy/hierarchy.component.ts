import { Component, OnInit, OnDestroy, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

/* TODO this is to be removed once API integration is done */
import { chartData } from "src/app/core/mocks/redesignedChartLongData";
import "src/assets/js/chart.js"
declare var createHierarchyChart: any;

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnInit {
  @Input() data: any;
  headingText = "Value Design Hierarchy View";
  hierarchyData: any;
  @Output() parentChildData = new EventEmitter();
  @Output() relationObjData = new EventEmitter();
  constructor(private modalService: NgbModal) { }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.data && changes.data.currentValue) {
      console.log("changes in middle vale m========================", changes.data.currentValue)
      this.hierarchyData = changes.data.currentValue;
    }
  }

  getParentChildData(event) {
    this.parentChildData.emit(event);
  }
  getRelationData(event) {
    this.relationObjData.emit(event)
  }

}


