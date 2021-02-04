import { Component, Output, EventEmitter, OnInit, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-description-modal",
  templateUrl: "./description-modal.component.html",
  styleUrls: ["./description-modal.component.scss"],
})
export class DescriptionModalComponent implements OnInit {
  @Output() status = new EventEmitter();
  @Input() descData: any;
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}
  // onSelectDescription(status) {
  //   this.status.emit(status);
  //   this.activeModal.close();
  // }
  dismissModal(status) {
    this.status.emit(status);
    this.activeModal.close();
  }
}
