import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer/buttonRenderer';

@Component({
  selector: 'app-roles-listing',
  templateUrl: './roles-listing.component.html',
  styleUrls: ['./roles-listing.component.scss']
})
export class RolesListingComponent implements OnInit {
  p:number=1;
  frameworkComponents: any
  constructor(
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  columnDefs = [
    { headerName: 'Roles Name', field: 'roles', filter: true, checkboxSelection: true},
    { headerName: 'Description', field: 'description', filter: true },
    { headerName: 'Access', field: 'access', filter: true },
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
  roles: " roles 1",
    description:"Roles be define by service",
    access:"Read,Write Delete"
     
    },
    {
      roles: " roles 2",
      description:"Roles be define by service",
      access:"Read,Write"
    },
    {
      roles: " roles 3",
      description:"Roles be define by service",
      access:"Read,Write,Edit "
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
