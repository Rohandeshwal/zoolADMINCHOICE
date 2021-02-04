import { Component, OnInit } from '@angular/core';
import { ButtonRendererComponent } from 'src/app/shared/components/renderer/button-renderer/buttonRenderer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-quizes-list',
  templateUrl: './manage-quizes-list.component.html',
  styleUrls: ['./manage-quizes-list.component.scss']
})
export class ManageQuizesListComponent implements OnInit {
  show = false;
  isCollapsed = false;
  p:number=1;

  frameworkComponents: any
  constructor( private router:Router
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  columnDefs = [
    {headerName: 'Quiz Name', field: 'object', filter: true},
    {headerName: 'Learning Journey', filter: true },
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
  rowData=[
    {
      object:"Quiz Name 1",
      business:"Lorem Ipsum",
      comments:"Lorem ipsum dolor sit amet, ipsum dolor sit amet, consectetur sit ipsum consectetur sit ipsum dolor Lorem ipsum dolor sit amet, ipsum dolor sit amet, consectetur sit ipsum consectetur sit ipsum dolor",
      visible:false
    },
    {
      object:"Quiz Name 2",
      business:"Lorem Ipsum",
      comments:"Lorem ipsum dolor sit amet, ipsum dolor sit amet, consectetur sit ipsum consectetur sit ipsum dolor",
      visible:false
    },
    {
      object:"Quiz Name 3",
      business:"Lorem Ipsum",
      comments:"Lorem ipsum dolor sit amet, ipsum dolor sit amet, consectetur sit ipsum consectetur sit ipsum dolor",
      visible:false
    },
    {
      object:"Quiz Name 4",
      business:"Lorem Ipsum",
      comments:"Lorem ipsum dolor sit amet, ipsum dolor sit amet, consectetur sit ipsum consectetur sit ipsum dolor",
      visible:false
    }
  ]

  ngOnInit() {
  }

  onEdit(data?) {
    console.log(this.router.url);

    this.router.navigate(['manage/quiz/add'])
  }
  onDelete(data?){
   console.log("on delete value");
  }

}
