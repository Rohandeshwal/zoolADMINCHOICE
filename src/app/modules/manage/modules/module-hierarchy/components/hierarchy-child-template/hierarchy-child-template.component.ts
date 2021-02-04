import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import * as d3 from "d3";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { EditModuleModalComponent } from "../edit-module-modal/edit-module-modal.component";
import { AddModuleModalComponent } from "../add-module-modal/add-module-modal.component";
import { path, svg } from "d3";
@Component({
  selector: "app-hierarchy-child-template",
  templateUrl: "./hierarchy-child-template.component.html",
  styleUrls: ["./hierarchy-child-template.component.scss"],
})
export class HierarchyChildTemplateComponent implements OnInit {
  // @Input() data: any;
  svg: any;
  @ViewChild("content", { static: true }) content: ElementRef;
  @ViewChild("subModuleModal", { static: true }) subModuleModal: ElementRef;
  modalRef: any;
  @Input() charData: any;
  data: any;
  selectedHierarchyData: any;

  @Output() selectedObj = new EventEmitter();
  @Output() selectedRelationObj = new EventEmitter();
  constructor(private modalService: NgbModal) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.charData && changes.charData.currentValue) {
      this.data = changes.charData.currentValue;
      console.log(this.data);
      this.buildSvg(this);
    }
  }
  // building hierarchy
  buildSvg(that) {
    if (that.svg) {
      that.svg.selectAll("*").remove();
    }

    that.svg = d3.select("svg").append("g");

    that.svgBox = d3
      .select("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      // .attr("viewBox", "0 0 1000 1000")
      // .attr("preserveAspectRatio", "none")
      .attr("style", "outline: medium solid red;")

      .call(
        d3
          .zoom()
          .scaleExtent([0, 10])
          .on("zoom", function () {
            that.svg.attr("transform", d3.event.transform);
          })
      );

    // that.svg.attr("transform", "translate(" + 50 + "," + 50 + ")");
    // .call(
    //   d3.zoom().on("zoom", function (svg: any) {
    //     console.log("aja", svg);
    //     // svg.attr("transform", d3.event.transform);
    //   })
    // )

    let dataStructure = d3
      .stratify()
      .id((d: any) => {
        console.log("aajaa", d);
        return d.child;
      })
      .parentId((d: any) => {
        return d.parent;
      })(that.data);
    // 650 will be decided acc to length of hierarchy
    let treeStructure = d3.tree().size([900, 300]);
    let info = treeStructure(dataStructure);
    // adding connections
    let connections = that.svg.append("g").selectAll("path").data(info.links());
    connections
      .enter()
      .append("path")

      .attr("d", (d: any) => {
        return (
          "M" +
          d.source.x +
          "," +
          d.source.y +
          " v 50 H" +
          d.target.x +
          " V" +
          d.target.y
        );
      });

    // adding rectangles
    let rectangles = that.svg
      .append("g")
      .selectAll("rect")

      .data(info.descendants());

    rectangles
      .enter()
      .append("rect")
      .attr("class", (d) => {
        console.log("re", d.data.type);
        return d.data.type === "BC" ? "rectBC" : "";
      })
      .attr("x", (d: any) => {
        return d.x - 125;
      })
      .attr("y", (d: any) => {
        return d.y - 30;
      })
      .on("click", (e) => that.handleRectClick(e));

    //adding names
    let names = that.svg.append("g").selectAll("text").data(info.descendants());
    names
      .enter()
      .append("text")
      .text((d) => {
        return d.data.child.length < 20
          ? d.data.child
          : d.data.child.substring(0, 20) + "...";
      })
      .attr("x", (d) => {
        return d.x;
      })
      .attr("y", (d) => {
        return d.y;
      })
      .classed("bigger", true)
      .on("click", (e) => that.handleRectClick(e));

    let images = that.svg.append("g").selectAll("img").data(info.descendants());

    images
      .enter()
      .append("svg:image")
      .attr("x", (d) => {
        return d.x - 20;
      })
      .attr("y", (d) => {
        return d.y - 29;
      })
      .attr("width", "30px")
      .attr("height", "25px")
      .attr("xlink:href", (d) => {
        return d.data.image;
      });
  }
  //add image

  // handle click on rectangle of hierarchy
  handleRectClick(e) {
    this.selectedHierarchyData = e.data;
    this.openEditModal();
  }

  openEditModal() {
    let modalRef = this.modalService.open(EditModuleModalComponent, {
      size: "sm",
    });
    modalRef.componentInstance.status.subscribe((res) => {
      console.log(res);
      if (res === "add") {
        this.openModalsList();
      }

      if (res === "delete") {
        this.selectedRelationObj.emit(this.selectedHierarchyData);
      }
    });
  }
  openModalsList() {
    let modalRef = this.modalService.open(AddModuleModalComponent, {});
    modalRef.componentInstance.mode = "child";
    modalRef.componentInstance.relationId = this.selectedHierarchyData.parentId;
    modalRef.componentInstance.selectedModule.subscribe((res) => {
      if (res) {
        let data = {
          parent: this.selectedHierarchyData,
          child: res,
        };
        this.selectedObj.emit(data);
      }
    });
  }
}
