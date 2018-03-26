import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ReportService } from "../../services/report.service";
import { Router } from "@angular/router";

@Component({
  selector: "view-report",
  templateUrl: "./view-report.component.html",
  styleUrls: ["./view-report.component.css"]
})
export class ViewReportComponent implements OnInit {
  @Input() student;
  @Output() update = new EventEmitter();
  @Output() discard = new EventEmitter();
  displayedColumns = ["Exam"];
  reportData = [];

  constructor(
    private reportService: ReportService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.reportService.getReport(this.student.id).subscribe(
      response => {
        if (response.body) {
          const marks = response.body["marks"];

          let columnsCollected = false;
          //composing marks in table data form
          for (let exam in marks) {
            const examReport = {};
            examReport["Exam"] = exam;
            for (let scores of marks[exam]) {
              examReport[scores.subject] = scores.score;
              //collecting the subjects to display on the columns
              if (!columnsCollected) {
                this.displayedColumns.push(scores.subject);
              }
            }
            columnsCollected = true;
            this.reportData.push(examReport);
          }
        } else {
          if (response.status === 204) {
            this.snackBar.open("No active report found", "OK", {
              duration: 3000
            });
          }
        }
      },
      (error: Response) => {
        console.log(error);
        switch (error.status) {
          case 404:
            this.snackBar.open("Report not found", "OK", {
              duration: 3000
            });
            //should be re-routed to students page
            break;
          default:
            this.snackBar.open("Something went wrong", "OK", {
              duration: 3000
            });
        }
      }
    );
  }

  onUpdate() {
    this.update.emit();
  }

  onDiscard() {
    this.discard.emit();
  }
}
