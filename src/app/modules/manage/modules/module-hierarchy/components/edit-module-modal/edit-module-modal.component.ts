import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-module-modal',
  templateUrl: './edit-module-modal.component.html',
  styleUrls: ['./edit-module-modal.component.scss']
})
export class EditModuleModalComponent implements OnInit {
  @Output() status = new EventEmitter()
  constructor(private modalService: NgbModal,) { }

  ngOnInit() {
  }


  // onSelect
  onSelect(status) {
    this.modalService.dismissAll();
    this.status.emit(status);
  }
}
