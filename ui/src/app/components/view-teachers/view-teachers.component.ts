import { Component, OnInit } from "@angular/core";
import { TeacherService } from "../../services/teacher.service";
import { MatSnackBar } from "@angular/material";
import { AssignTeacherComponent } from "../assign-teacher/assign-teacher.component";

@Component({
  selector: "app-view-teachers",
  templateUrl: "./view-teachers.component.html",
  styleUrls: ["./view-teachers.component.css"]
})
export class ViewTeachersComponent implements OnInit {
  schoolId = "test-user";
  teachers;
  teacherData = [];
  displayedColumns = ["index", "name", "department", "email"];
  constructor(
    private teacherService: TeacherService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.teacherService.getTeachers(this.schoolId).subscribe(
      response => {
        if (response.body) {
          this.teachers = response.body;
          let i = 0;
          this.teacherData = this.teachers.map(teacher => {
            i++;
            return {
              index: i,
              name: teacher.teacherName,
              department: teacher.department,
              email: teacher.email
            };
          });
        }
      },
      (error: Response) => {
        console.log(error);
        switch (error.status) {
          case 404:
            this.snackBar.open("Teachers not found", "OK", {
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
}
