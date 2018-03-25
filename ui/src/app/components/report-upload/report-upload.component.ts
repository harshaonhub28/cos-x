import { Component, OnInit } from "@angular/core";
import { StandardService } from "../../services/standard.service";
import { ReportService } from "../../services/report.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "report-upload",
  templateUrl: "./report-upload.component.html",
  styleUrls: ["./report-upload.component.css"]
})
export class ReportUploadComponent implements OnInit {
  student = {
    id: "5ab53b95d3b2dd2724652a75",
    studentName: "Leo Messi",
    level: "Barcelona"
  };
  subjects = [];
  validExamTypes = [];
  selectedExam;
  scores = [];
  report = {
    schoolId: "test-user",
    teacherId: "test-teacher",
    studentId: this.student.id,
    standard: this.student.level,
    marks: {}
  };
  showSpinner;

  constructor(
    private subjectService: StandardService,
    private reportService: ReportService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //retrieving the subjects that the student is enrolled in
    this.subjectService
      .getSubjects({ schoolId: "test-user", level: this.student.level })
      .subscribe(
        response => {
          if (response.status === 200) {
            this.subjects = response.body["subjects"];
            //composing the scores according to the subjects
            this.scores = this.subjects.map(subject => {
              return {
                subject: subject,
                score: ""
              };
            });
          }
        },
        (error: Response) => {
          console.log(error);
          switch (error.status) {
            case 404:
              this.snackBar.open("Subjects not found", "OK", {
                duration: 2000
              });
              break;
            default:
              this.snackBar.open("Something went wrong", "OK", {
                duration: 2000
              });
          }
        }
      );

    //retrieving the existing report for this student
    this.reportService.getReport(this.student.id).subscribe(
      response => {
        if (response.body) {
          const oldReport = response.body;
          for (let exam in oldReport) {
            switch (exam) {
              case "internals":
                if (!oldReport[exam].length) {
                  this.validExamTypes.push("Internals");
                }
                break;
              case "semExams":
                if (!oldReport[exam].length) {
                  this.validExamTypes.push("Semester exams");
                }
                break;
              case "termExams":
                if (!oldReport[exam].length) {
                  this.validExamTypes.push("Term exams");
                }
                break;
              case "practicals":
                if (!oldReport[exam].length) {
                  this.validExamTypes.push("Practicals");
                }
                break;
              case "projects":
                if (!oldReport[exam].length) {
                  this.validExamTypes.push("Projects");
                }
            }
          }
        } else {
          //case for newly uploaded report
          this.validExamTypes = [
            "Internals",
            "Semester exams",
            "Term exams",
            "Practicals",
            "Projects"
          ];
        }
      },
      (error: Response) => {
        console.log(error);
        switch (error.status) {
          case 404:
            this.snackBar.open("Request source not found", "OK", {
              duration: 2000
            });
            break;
          default:
            this.snackBar.open("Something went wrong", "OK", {
              duration: 2000
            });
        }
      }
    );
  }

  //storing the scores from the form
  /*onInput(input) {
    for (let markSheet of this.scores) {
      if (markSheet.subject === input.id) {
        markSheet.score = input.value;
        break;
      }
    }
  }*/

  onUpload() {
    let uploadReady = true;
    if (!this.selectedExam) {
      this.snackBar.open("Please select an exam", "OK", {
        duration: 3000
      });
      uploadReady = false;
    } else {
      for (let markSheet of this.scores) {
        if (!markSheet.score) {
          this.snackBar.open("Please fill score for all the subjects", "OK", {
            duration: 3000
          });
          uploadReady = false;
          break;
        }
      }

      if (uploadReady) {
        this.showSpinner = true;
        this.report.marks = {};
        this.report.marks[this.selectedExam] = this.scores;
        this.reportService.uploadReport(this.report).subscribe(
          response => {
            if (response.status === 200) {
              this.snackBar.open("Report successfully uploaded", "OK", {
                duration: 3000
              });
              //resetting the page
              this.showSpinner = false;
              for (let exam of this.validExamTypes) {
                if (exam === this.selectedExam) {
                  let index = this.validExamTypes.indexOf(exam);
                  this.validExamTypes.splice(index, 1);
                  break;
                }
              }
              this.selectedExam = "";
              for (let markSheet of this.scores) {
                markSheet.score = "";
              }
            }
          },
          (error: Response) => {
            this.showSpinner = false;
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
  }
}
