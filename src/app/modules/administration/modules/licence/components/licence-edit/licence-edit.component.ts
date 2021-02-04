import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-licence-edit',
  templateUrl: './licence-edit.component.html',
  styleUrls: ['./licence-edit.component.scss']
})
export class LicenceEditComponent implements OnInit {
  licenceEditlist=[
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
  ]
  constructor() { }

  ngOnInit() {
  }

}
