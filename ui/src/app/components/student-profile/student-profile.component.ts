import { Component, OnInit, OnChanges } from "@angular/core";
import { ReportService } from "../../services/report.service";
import { MatSnackBar } from "@angular/material";
import { ViewReportComponent } from "../view-report/view-report.component";
import { ReportUploadComponent } from "../report-upload/report-upload.component";
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from "@angular/router";
import { StudentService } from "../../services/student.service";

@Component({
  selector: "app-student-profile",
  templateUrl: "./student-profile.component.html",
  styleUrls: ["./student-profile.component.css"]
})
export class StudentProfileComponent implements OnInit {
  email;
  student;
  reportExists = false;
  noOptions = false;
  viewReport = false;
  uploadReport = false;
  constructor(
    private studentService: StudentService,
    private reportService: ReportService,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe(params => {
      this.email = params.get("email");
    });
  }

  ngOnInit() {
    this.studentService.getStudent(this.email).subscribe(
      response => {
        if (response.body) {
          console.log(response.body);
          this.student = response.body;
          this.reportService.getReport(this.student.id).subscribe(
            response => {
              if (response.body) {
                this.reportExists = true;
              } else if (response.status === 204) {
                this.reportExists = false;
              }
            },
            (error: Response) => {
              this.noOptions = true;
              console.log(error);
              switch (error.status) {
                case 404:
                  this.snackBar.open("Report not found", "OK", {
                    duration: 3000
                  });

                  break;
                default:
                  this.snackBar.open("Something went wrong", "OK", {
                    duration: 3000
                  });
              }
            }
          );
        }
      },
      (error: Response) => {
        console.log(error);
        switch (error.status) {
          case 404:
            this.snackBar.open("Student not found", "OK", {
              duration: 3000
            });

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
    (this.viewReport = false), (this.uploadReport = true);
  }

  onView() {
    this.viewReport = true;
    this.uploadReport = false;
  }

  onDiscard() {
    this.reportService.discardReport(this.student.id).subscribe(
      response => {
        if (response.status === 202) {
          this.snackBar.open("Report discarded", "OK", {
            duration: 3000
          });
          this.viewReport = false;
          this.uploadReport = true;
        }
      },
      (error: Response) => {
        console.log(error);
        switch (error.status) {
          case 404:
            this.snackBar.open("Request source not found", "OK", {
              duration: 3000
            });
            break;
          default:
            this.snackBar.open("Something went wrong", "OK", {
              duration: 3000
            });
        }
      }
    );
  }
}
