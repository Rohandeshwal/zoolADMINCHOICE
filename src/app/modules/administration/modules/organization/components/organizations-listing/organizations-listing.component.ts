import { Component, OnInit } from "@angular/core";
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer/buttonRenderer';
import { SocialMediaButtonRendererComponent } from 'src/app/shared/components/renderer/social-media-buttons/social-media-buttons';

@Component({
  selector: "app-organizations-listing",
  templateUrl: "./organizations-listing.component.html",
  styleUrls: ["./organizations-listing.component.scss"]
})
export class OrganizationsListingComponent implements OnInit {
  p:number=1;
  frameworkComponents: any
  constructor(
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      socialmediaButtonRenderer: SocialMediaButtonRendererComponent
    }
  }

  columnDefs = [
    { headerName: 'Id', field: 'id', filter: true, checkboxSelection: true},
    { headerName: 'Organization Name', field: 'organization', filter: true,},
    { headerName: 'User Type', field: 'type', filter: true },
    { headerName: 'Access Type', field: 'access', filter: true },
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
      organization: "Organization 1",
     
      type:"Standard Custom",
      access:"User Content Admin",
     
    },
    {
      id:"2",

      organization: "Organization 2",
     
      type:"Standard Custom",
      access:"User Content Admin",
     
    },
    {
      id:"3",

      organization: "Organization 3",
     
      type:"Standard Custom",
      access:"User Content Admin",
     
    }
  ];

  ngOnInit() {}
  onEdit(data?) {
    console.log("on edit value");
  }
  onDelete(data?) {
    console.log("on delete value");
  }
}
