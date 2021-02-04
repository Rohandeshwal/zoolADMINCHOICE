import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {

  @Output() status = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  ngOnInit() { }
  onSelect(status) {
    this.modalService.dismissAll();
    this.status.emit(status);
  }
  dismissModal(status) {
    this.status.emit(status);
    this.activeModal.close();
  }

}
