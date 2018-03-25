import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class StandardService {
  constructor(private http: HttpClient) {}

  url = "http://localhost:3000/api/";
  uploadStandards(body) {
    return this.http.post(this.url + "upload/standards", body, {
      observe: "response"
    });
  }

  getSubjects(standard) {
    return this.http.get(
      this.url + `get/subjects/${standard.schoolId}/${standard.level}`,
      {
        observe: "response"
      }
    );
  }
}
