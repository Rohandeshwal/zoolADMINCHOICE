import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer/buttonRenderer';

@Component({
  selector: 'app-institution-listing',
  templateUrl: './institution-listing.component.html',
  styleUrls: ['./institution-listing.component.scss']
})
export class InstitutionListingComponent implements OnInit {
  p:number=1;
  frameworkComponents: any
  constructor(
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    }
  }

  columnDefs = [
    { headerName: 'Id', field: 'id', filter: true, },

    { headerName: 'Institution Name', field: 'institution', filter: true, },

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
     institution: "institution 1",
     
      type:"Standard Custom",
      access:"User Content Admin",
     
    },
    {
      id:"2",
     institution: "institution 2",
     
      type:"Standard Custom",
      access:"User Content Admin",
     
    },
    {
      id:"3",
     institution: "institution 3",
     
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
