import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer/buttonRenderer';

@Component({
  selector: 'app-licence-table',
  templateUrl: './licence-table.component.html',
  styleUrls: ['./licence-table.component.scss']
})
export class LicenceTableComponent implements OnInit {

  frameworkComponents: any
  constructor(
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  columnDefs = [
    {headerName: '', field: 'name', filter: true,  },
    {headerName: 'View', checkboxSelection: true},
    {headerName: 'Create', checkboxSelection: true},
    {headerName: 'Edit', checkboxSelection: true},
    {headerName: 'Delete', checkboxSelection: true},
    // {headerName: 'System Define'},
    // {headerName: 'Created By', field: 'createdBy', filter: true},
    // {headerName: 'Created On', filter: true},
  //  {headerName: 'Action',
  //    cellRenderer: 'buttonRenderer',
  //    cellRendererParams: {
  //      onEdit: this.onEdit.bind(this),
  //      onDelete: this.onDelete.bind(this),
  //    }
  //  }
 ];
  rowData=[
    {
      name:'Function/Industry/Sector(Ex:Sales,FMCG,Garments)'
    },
    {
      name:'Project Workspace'
    },
    {
      name:'Choiceboard'
    },
    {
      name:'Module'
    },
    {
      name:'Sub-Module'
    },
    {
      name:'Business Component(Pre-Seeded)'
    },
    {
      name:'Business Component(Custom)'
    },
    {
      name:'Business Component Notes'
    },
    {
      name:'Review Components (Choiceboard/Component)'
    }
  ];

  ngOnInit() {
  }

}
