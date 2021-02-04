import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Input() links: any;
  showTextField: boolean;
  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes.links &&
      changes.links.currentValue
    ) {
    }
    console.log(
      "changes in input",
      changes.links.currentValue
    );
  }
  addDOC() {
    this.links.documents.push({
      url: ""
    });
  }
  removeDOC(i) {
    this.links.documents.splice(i, 1);
  }
  addURL() {
    this.links.links.push({
      url: ""
    });
  }
  removeURL(i) {
    this.links.links.splice(i, 1);
  }
  addVideoURL() {
    this.links.videos.push({
      url: ""
    });
  }
  removeVideoURL(i) {
    this.links.videos.splice(i, 1);
  }
  viewField() {
    this.showTextField = !this.showTextField
  }
}