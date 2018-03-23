import { Component, OnInit } from "@angular/core";

@Component({
  selector: "view-report",
  templateUrl: "./view-report.component.html",
  styleUrls: ["./view-report.component.css"]
})
export class ViewReportComponent implements OnInit {
  displayedColumns = ["exam", "maths", "social", "science"];
  reportData = [
    {
      exam: "internals",
      maths: 90,
      science: 94,
      social: 96
    },
    {
      exam: "term exams",
      maths: 96,
      science: 94,
      social: 86
    },
    {
      exam: "sem exams",
      maths: 99,
      science: 95,
      social: 86
    }
  ];

  constructor() {}

  ngOnInit() {}
}
