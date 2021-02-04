import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isViewableForgot: boolean;
  showForgotPassword: boolean;

  constructor(public router: Router) {
    this.showForgotPassword=false;
   }


  ngOnInit() {
  }

  // forgotPassword(){
  //   this.showForgotPassword = !this.showForgotPassword
  // }


  routeToOTP(event) {
    this.router.navigate(["/manage"]);
  }
}
