import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer/buttonRenderer';

@Component({
  selector: 'app-collaborator-listing',
  templateUrl: './collaborator-listing.component.html',
  styleUrls: ['./collaborator-listing.component.scss']
})
export class CollaboratorListingComponent implements OnInit {
  p:number=1;

  frameworkComponents: any
  constructor(
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    }
  }

  columnDefs = [
    { headerName: 'Id', field: 'id', filter: true},
    { headerName: 'Collaborator Name', field: 'collaborator', filter: true,},
 
    { headerName: 'User Type', field: 'type', filter: true },
    { headerName: 'Access Type', field: 'access', filter: true },
    // { headerName: 'Links (Url)', 
    //   cellRenderer: (data) => {
    //     return `<img style="height: 15px" src="./assets/images/link.svg">`
    //   } 
    // },
   
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
      collaborator: "Collaborator 1",
      type:"Standard Custom",
      access:"User Content Admin",
    },
    {
      id:"2",
      collaborator: "Collaborator 2",
      type:"Standard Custom",
      access:"User Content Admin",
    },
    {
      id:"3",
      collaborator: "Collaborator 3",
      type:"Standard Custom",
      access:"User Content Admin",
    }
  ];

  ngOnInit() {
  }

  onEdit(data?) {
    console.log("on edit value");
  }
  onDelete(data?) {
    console.log("on delete value");
  }

}
