import { Component, OnInit } from "@angular/core";
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer/buttonRenderer';
import {SocialMediaButtonRendererComponent} from 'src/app/shared/components/renderer/social-media-buttons/social-media-buttons';

@Component({
  selector: "app-user-listing",
  templateUrl: "./user-listing.component.html",
  styleUrls: ["./user-listing.component.scss"]
})
export class UserListingComponent implements OnInit {
  p: number = 1;
  frameworkComponents: any
  constructor(
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      socialmediaButtonRenderer: SocialMediaButtonRendererComponent
    }
  }

  columnDefs = [
    { headerName: 'Id', field: 'id', filter: true},
    { headerName: 'Name', field: 'name', filter: true, },
   
    { headerName: 'User Type', field: 'user', filter: true },
    { headerName: 'Access Type', field: 'access', filter: true },
    { headerName: 'License Criteria', field: 'License', filter: true },
    {
      headerName: 'Action', pinned: 'right',lockPinned:true,  
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onEdit: this.onEdit.bind(this),
        onDelete: this.onDelete.bind(this),
      }
    }
  ];

  rowData = [
    {
      id:"1",
      name: "John Doe",
      user: "Free User",
      access: "User Content Admin",
      License: "Standard, Custom"
    },
    {
      id:"2",
      name: "John Doe",
     
      user: "Free User",
      access: "User Content Admin",
      License: "Standard, Custom"
    },
    {
      id:"3",
      name: "John Doe",
      email: "john@gmail.com",
    
      user: "Free User",
      access: "User Content Admin",
      License: "Standard, Custom"
    },
    {

   
      id:"4",
    
      name: "John Doe",
     
      user: "Free User",
      access: "User Content Admin",
      License: "Standard, Custom"
    },
    {
      id:"5",


      name: "John Doe",
     
      user: "Free User",
      access: "User Content Admin",
      License: "Standard, Custom"
    },

    {
      id:"6",

      name: "John Doe",
     
      user: "Free User",
      access: "User Content Admin",
      License: "Standard, Custom"
    }, {

      id:"7",

      name: "John Doe",
     
      user: "Free User",
      access: "User Content Admin",
      License: "Standard, Custom"
    }, {
      id:"8",

      name: "John Doe",
     
      user: "Free User",
      access: "User Content Admin",
      License: "Standard, Custom"
    }, {
      id:"9",

      name: "John Doe",
     
      user: "Free User",
      access: "User Content Admin",
      License: "Standard, Custom"
    },
    {
      id:"10",

      name: "John Doe",
     
      user: "Free User",
      access: "User Content Admin",
      License: "Standard, Custom"
    },

  ];

  ngOnInit() { }

  onEdit(data?) {
    console.log("on edit value");
  }
  onDelete(data?) {
    console.log("on delete value");
  }
}
