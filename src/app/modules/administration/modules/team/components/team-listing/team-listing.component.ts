import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer/buttonRenderer';

@Component({
  selector: 'app-team-listing',
  templateUrl: './team-listing.component.html',
  styleUrls: ['./team-listing.component.scss']
})
export class TeamListingComponent implements OnInit {

  frameworkComponents: any
  constructor(
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  columnDefs = [
    { headerName: 'Team Name', field: 'name', filter: true, checkboxSelection: true},
    { headerName: 'Description', field: 'description', filter: true },
    { headerName: 'Created On', field: 'createdOn', filter: true },
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
      name: "Team 1",
      description: "Lorem ipsum dolor sit amet,consectetur adipising elit Morbi",
      createdOn: 'Kaffee'
    },
    {
      name: "Team 2",
      description: "Lorem ipsum dolor sit amet,consectetur adipising elit Morbi",
      createdOn: 'Kaffee'
    },
    {
      name:"Team 2",
      description: "Lorem ipsum dolor sit amet,consectetur adipising elit Morbi",
      createdOn: 'Kaffee'
    },
    {
      name:"Team 3",
      description: "Lorem ipsum dolor sit amet,consectetur adipising elit Morbi",
      createdOn: 'Kaffee'
    },
    
    
  ]
  ngOnInit() {
  }

  onEdit(data?) {
    console.log("on edit value");
  }
  onDelete(data?) {
    console.log("on delete value");
  }

}
