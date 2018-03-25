import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  url = "http://localhost:3000/api/";

  getReport(studentId) {
    return this.http.get(this.url + `get/report/${studentId}`, {
      observe: "response"
    });
  }

  uploadReport(report) {
    return this.http.post(this.url + `upload/report`, report, {
      observe: "response"
    });
  }

  discardReport(studentId) {
    return this.http.delete(this.url + `delete/report/${studentId}`, {
      observe: "response"
    });
  }
}
