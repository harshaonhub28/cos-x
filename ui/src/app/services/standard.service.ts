import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class StandardService {
  constructor(private http: HttpClient) {}

  url = "http://localhost:3000/api/upload/standards";
  uploadStandards(body) {
    return this.http.post(this.url, body, {
      observe: "response"
    });
  }
}
