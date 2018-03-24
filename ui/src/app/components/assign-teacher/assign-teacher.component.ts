import { Component, OnInit } from "@angular/core";
import { TeacherService } from "../../services/teacher.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "assign-teacher",
  templateUrl: "./assign-teacher.component.html",
  styleUrls: ["./assign-teacher.component.css"]
})
export class AssignTeacherComponent implements OnInit {
  teachers = [];
  selectedTeacher;
  selectedStandard;
  selectedDuration;
  showSpinner;

  classes = ["barca", "madrid", "city"];
  durations = ["Semester", "Year"];
  constructor(private service: TeacherService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.service.getTeachers().subscribe(
      response => {
        if (Object.keys(response.body).length) {
          for (let key in response.body) {
            this.teachers.push(response.body[key]);
          }
        }
      },
      (error: Response) => {
        switch (error.status) {
          case 404:
            this.snackBar.open("Teachers not found", "OK", {
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

  onAssign() {
    const body = {
      teacherId: this.selectedTeacher,
      standard: this.selectedStandard,
      duration: this.selectedDuration
    };

    this.service.assignTeacher(body).subscribe(
      response => {
        if (response.status === 200) {
          this.snackBar.open("Teacher assigned to the selected class", "OK", {
            duration: 2000
          });
        }
        this.selectedTeacher = "";
        this.selectedStandard = "";
        this.selectedDuration = "";
        this.showSpinner = false;
      },
      (error: Response) => {
        switch (error.status) {
          default:
            this.snackBar.open("Something went wrong", "OK", {
              duration: 2000
            });
        }
        this.selectedTeacher = "";
        this.selectedStandard = "";
        this.selectedDuration = "";
        this.showSpinner = false;
      }
    );
  }
}
