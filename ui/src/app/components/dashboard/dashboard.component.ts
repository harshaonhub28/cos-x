import { Component, OnInit } from "@angular/core";
import { StandardUploadComponent } from "../standard-upload/standard-upload.component";
import { StudentUploadComponent } from "../student-upload/student-upload.component";
import { TeacherUploadComponent } from "../teacher-upload/teacher-upload.component";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
