import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  lookuplist = [
    {
      name: "Roby",
      description: "Lorem ipsum dolor sit amet,consectetur adipising elit Morbi",
     
    },
    {
      name: "Romit",
      description: "Lorem ipsum dolor sit amet,consectetur adipising elit Morbi",
     
    },
  ]
  //modal
  openSm(user) {
    this.modalService.open(user, { size: 'lg' });
  }
  p:number=1;
  userlist = [
    {
      name: "John Doe",
      email: "john@gmail.com",
      mobile: 9789442125,
     
      locationinfo: "Hubli,Karnataka",
      mediaTwiter: "fa-twitter",
      mediaLink: "fa-linkedin",
      mediaFb: "facebook.svg",
      mediaInsta: "instagram.png",
      user:"Free User",
      access:"User Content Admin",
      Licence:"Standard, Custom"
    },
    {
      name: "John Doe",
      email: "john@gmail.com",
      mobile: 9789442125,
  
      locationinfo: "Hubli,Karnataka",
      mediaTwiter: "fa-twitter",
      mediaLink: "fa-linkedin",
      mediaFb: "facebook.svg",
      mediaInsta: "instagram.png",
      user:"Free User",
      access:"User Content Admin",
      Licence:"Standard, Custom"
    },
    {
      name: "John Doe",
      email: "john@gmail.com",
      mobile: 9789442125, 
      locationinfo: "Hubli,Karnataka",
      mediaTwiter: "fa-twitter",
      mediaLink: "fa-linkedin",
      mediaFb: "facebook.svg",
      mediaInsta: "instagram.png",
      user:"Free User",
      access:"User Content Admin",
      Licence:"Standard, Custom"
    },]

  ngOnInit() {
  }

}
