import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../services/student.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-students",
  templateUrl: "./view-students.component.html",
  styleUrls: ["./view-students.component.css"]
})
export class ViewStudentsComponent implements OnInit {
  selectedStandard;
  students;
  studentData = [];
  standards = ["Barcelona", "real madrid"];
  displayedColumns = ["index", "name", "email"];
  constructor(
    private service: StudentService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  onSelect() {
    this.service.getStudents(this.selectedStandard).subscribe(
      response => {
        if (response.body) {
          this.students = response.body;
          let i = 0;
          this.studentData = this.students.map(student => {
            i++;
            return {
              index: i,
              name: student.name,
              email: student.email
            };
          });
        }
      },
      (error: Response) => {
        console.log(error);
        switch (error.status) {
          case 404:
            this.snackBar.open("Students not found", "OK", {
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

  onTableClick(student) {
    this.router.navigate(["/student-profile", student.email]);
  }
}
