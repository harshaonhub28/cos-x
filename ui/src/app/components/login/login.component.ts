import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../services/auth.service";
import { Router, RouterStateSnapshot, ActivatedRoute } from "@angular/router";

import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  model = {
    email: "",
    password: ""
  };
  invalidLogin;
  showSpinner = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // authentication
    if (auth.isLoggedIn()) {
      router.navigate(["/dashboard"]);
    }
  }

  ngOnInit() {}

  formSubmit = f => {
    console.log(f);
    this.showSpinner = true;
    if (f.valid) {
      this.auth.login(f.value).subscribe(
        response => {
          if (response) {
            const returnUrl = this.route.snapshot.queryParamMap.get(
              "returnUrl"
            );
            //console.log(returnUrl);
            this.router.navigate([returnUrl || "/dashboard"]);
          } else this.invalidLogin = "Invalid credentials";
          this.showSpinner = false;
        },
        (error: Response) => {
          // console.log(error);
          switch (error.status) {
            case 401:
              this.invalidLogin = "Invalid credentials";
              break;
            case 404:
              this.invalidLogin = "Something went wrong";
              break;
            default:
              this.invalidLogin = "Something went wrong";

              this.showSpinner = false;
          }
        }
      );
    }
    //console.log('entered');
    //this.auth.login();
    //this.router.navigate(['/dashboard']);
  };
}
