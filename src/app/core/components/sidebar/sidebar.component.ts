import { Component, OnInit, Input } from "@angular/core";
import { NgbPanelChangeEvent } from "@ng-bootstrap/ng-bootstrap";
// export interface sideBarInput{
//   header:string
// }
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  // @Input('inputFrom') input:sideBarInput
  sidebarConfig: any;
  public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === "preventchange-2") {
      $event.preventDefault();
    }
    if ($event.panelId === "preventchange-3" && $event.nextState === false) {
      $event.preventDefault();
    }
  }
  constructor() {}
  ngOnInit() {
    this.initSidebar();
  }
  initSidebar() {
    this.sidebarConfig = {
      parentItems: [
        {
          name: "Home",
          route: "/dashboard/home",
          img: "./assets/images/home.svg",
          icon: "fa fa-home",
        },

        {
          name: "Functional Setup",
          route: "",
          img: "./assets/images/manage.svg",
          icon: "fa fa-cogs",
          children: [
            {
              name: "Modules",
              route: "/manage/module",
              children: [],
            },
            {
              name: "Modules Hierarchy",
              route: "/manage/module-hierarchy",
              children: [],
            },

            {
              name: "Business Component",
              route: "/manage/business-component",
              children: [],
            },
            {
              name: "Business Relation Group",
              route: "/manage/business-relations-group",
              children: [],
            },
            {
              name: "Business Component Relationships",
              route: "/manage/business-component-relationship",
              children: [],
            },

            {
              name: "Workspace Context Groups",
              route: "/manage/context-group",
              children: [],
            },
            {
              name: "Workspace Contexts",
              route: "/manage/context",
              children: [],
            },
            {
              name: "Workspace Context Relationships",
              route: "/manage/context-relationship",
              children: [],
            },
            {
              name: "Case Studies",
              route: "/manage/case-study",
              children: [],
            },
            {
              name: "Questions/Quizes",
              route: "/manage/quiz",
              children: [],
            },
          ],
        },
        {
          name: "Users & Licenses",
          route: "",
          img: "./assets/images/setup.svg",
          icon: "fa fa-users",
          children: [
            {
              name: "Individual Users ",
              route: "/administration/user",
              children: [],
            },
            {
              name: "Organisations",
              route: "/administration/organization",
              children: [],
            },
            {
              name: "Team",
              route: "/administration/team",
              children: [],
            },
            {
              name: "Collaborators",
              route: "/administration/collaborator",
              children: [],
            },

            {
              name: "B-Schools & Univerisities",
              route: "/administration/institution",
              children: [],
            },
            {
              name: "Licenses",
              route: "/administration/licence",
              children: [],
            },
            {
              name: "Roles",
              route: "/administration/roles",
              children: [],
            },
          ],
        },
      ],
    };
  }
}
