import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../services/student.service";
import { MatSnackBar } from "@angular/material";

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
  constructor(private service: StudentService, public snackBar: MatSnackBar) {}

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
      (error: Response) => {}
    );
  }
}
