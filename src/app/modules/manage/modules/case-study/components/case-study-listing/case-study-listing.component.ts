import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer/buttonRenderer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-study-listing',
  templateUrl: './case-study-listing.component.html',
  styleUrls: ['./case-study-listing.component.scss']
})
export class CaseStudyListingComponent implements OnInit {
  show = false;
  p: number = 1;
  isCollapsed = false;
  frameworkComponents: any
  constructor( private router:Router
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  columnDefs = [
    {headerName: 'Case Study Name', field: 'caseName', filter: true },
    // {headerName: 'Description', field: 'description', filter: true},
    // {headerName: 'System Define'},
    // {headerName: 'Created By', field: 'createdBy', filter: true},
    // {headerName: 'Created On', filter: true},
   {headerName: 'Action',
     cellRenderer: 'buttonRenderer',
     cellRendererParams: {
       onEdit: this.onEdit.bind(this),
       onDelete: this.onDelete.bind(this),
     }
   }
 ];

  rowData = [
    {
      caseName: "Case study 1",
    },
    {
      caseName: "Case study 2",
    },
    {
      caseName: "Case study 3",
    },
  ]

  ngOnInit() {
  }

  onEdit(data?) {
    console.log(this.router.url);

    this.router.navigate(['manage/case-study/add'])
  }
  onDelete(data?){
   console.log("on delete value");
  }

}
