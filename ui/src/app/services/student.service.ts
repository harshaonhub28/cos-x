import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class StudentService {
  constructor(private http: HttpClient) {}
  url = "http://localhost:3000/api/upload/students";
  uploadStudents(body) {
    return this.http.post(this.url, body, { observe: "response" });
  }
}
