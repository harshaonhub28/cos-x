import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TeacherService {
  constructor(private http: HttpClient) {}

  url = "http://localhost:3000/api/";
  uploadTeachers(body) {
    return this.http.post(this.url + "upload/teachers", body, {
      observe: "response"
    });
  }

  getTeachers() {
    return this.http.get(this.url + "get/teachers/test-user", {
      observe: "response"
    });
  }

  assignTeacher(body) {
    return this.http.post(this.url + "assign-teacher", body, {
      observe: "response"
    });
  }
}
