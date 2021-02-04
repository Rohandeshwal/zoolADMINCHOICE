import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  NgbModal,
  NgbActiveModal,
  NgbTabset,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-delete-confirmation",
  templateUrl: "./delete-confirmation.component.html",
  styleUrls: ["./delete-confirmation.component.scss"],
})
export class DeleteConfirmationComponent implements OnInit {
  @Output() status = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}
  onSelect(status) {
    this.modalService.dismissAll();
    this.status.emit(status);
  }
  dismissModal(status) {
    this.status.emit(status);
    this.activeModal.close();
  }
}
