import { Component, OnInit } from "@angular/core";

@Component({
  selector: "report-upload",
  templateUrl: "./report-upload.component.html",
  styleUrls: ["./report-upload.component.css"]
})
export class ReportUploadComponent implements OnInit {
  subjects = ["maths", "science", "social"];
  validExamTypes = ["internals", "term exams", "sem exams"];
  examType;

  constructor() {}

  ngOnInit() {}
}
