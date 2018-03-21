import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login = (credentials?) => {
    const url = "http://localhost:3000/api/login";

    return this.http.post(url, credentials).map(response => {
      //console.log(response);
      if (response && response["token"]) {
        //console.log(response["token"]);
        localStorage.setItem("cos-x-token", response["token"]);
        return true;
      }
      return false;
    });
  };

  signup = (credentials?) => {
    const url = "http://localhost:3000/api/signup";

    return this.http
      .post(url, credentials, { observe: "response" })
      .map(response => {
        //console.log(response);
        if (response.status === 200) {
          return true;
        } else return false;
      });
  };

  logout = () => {
    localStorage.removeItem("cos-x-token");
  };

  isLoggedIn = () => {
    const access_token = localStorage.getItem("cos-x-token");

    if (!access_token) {
      return false;
    }

    // let tokenExpData = jwtHelper.getTokenExpirationDate(access_token),
    //     isExpired = jwtHelper.isTokenExpired(access_token);

    // console.log('date ', tokenExpData);
    // console.log('isexpired ', isExpired);

    return true;
  };

  /*getToken = () => {
    if (this.isLoggedIn()) {
      return localStorage.getItem("access_token");
    }
    return "";
  };*/

  getUser() {
    const token = localStorage.getItem("cos-x-token");
    if (!token) {
      return false;
    } else {
      const decodedToken = new JwtHelperService().decodeToken(token);
      //console.log(decodedToken);
      return decodedToken;
    }
  }
}
