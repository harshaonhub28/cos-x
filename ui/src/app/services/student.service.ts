import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class StudentService {
  constructor(private http: HttpClient) {}
  url = "http://localhost:3000/api/";
  uploadStudents(body) {
    return this.http.post(this.url + "upload/students", body, {
      observe: "response"
    });
  }

  getStudents(standard) {
    return this.http.get(this.url + `get/students/${standard}`, {
      observe: "response"
    });
  }

  //Retrieving a student
  getStudent(email) {
    return this.http.get(this.url + `get/student/${email}`, {
      observe: "response"
    });
  }
}
