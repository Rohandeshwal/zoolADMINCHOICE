import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HTTPService } from './http.service';
import { APIConfig } from 'src/app/configurations/api.config';
import { environment } from 'src/environments/environment';
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private shareModalSource = new BehaviorSubject(false);
  shareModalState = this.shareModalSource.asObservable();

  private extendHeader = new BehaviorSubject(false);
  getExtHeader = this.extendHeader.asObservable();
  isNewCB: any;

  // apiConfig: any = APIConfig;
  constructor(private http: HTTPService,  private toaster: ToastrService) {

  }
  showSuccess(msg: string, title?: string) {
    this.toaster.success(this.capitalizeString(msg), "Success");
  }

  showWarning(msg: string, title?: string) {
    this.toaster.warning(this.capitalizeString(msg), "Warning");
  }

  showInfo(msg: string, title?: string) {
    this.toaster.info(this.capitalizeString(msg), "Info");
  }

  showError(msg: string, title?: string) {
    this.toaster.error(this.capitalizeString(msg), "Error");
  }
  
  capitalizeString(stringInput: string) {
    if (stringInput && stringInput.trim()) {
      stringInput = stringInput.trim();
      stringInput = stringInput.replace(/(\s)+/g, " ");
      stringInput = stringInput.toLocaleLowerCase();
      // console.log("--string input", stringInput, stringInput.length);
      return stringInput.charAt(0).toUpperCase() + stringInput.slice(1);
    } else {
      return "";
    }
  }

  openShareModal(val: boolean) {
    this.shareModalSource.next(val);
  }

  setExtHeader(value: boolean) {
    this.extendHeader.next(value);
  }

  setNewCB(value) {
    this.isNewCB = value;
  }

  getNewCB() {
    return this.isNewCB;
  }
}
