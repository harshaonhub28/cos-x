import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../services/auth.service";
import { Router, RouterStateSnapshot, ActivatedRoute } from "@angular/router";

import { NgForm } from "@angular/forms";

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  model = {
    name: "",
    email: "",
    username: "",
    password: "",
    role: "Admin"
  };
  signupError;
  signupSuccess = false;
  showSpinner = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /*this.signupSuccess = false;*/
  }

  formSubmit = f => {
    //console.log(f);
    this.showSpinner = true;
    if (f.valid) {
      this.auth.signup(this.model).subscribe(
        response => {
          if (response) {
            this.signupSuccess = true;
          } else this.signupError = "Signup not succesful";
          this.showSpinner = false;
        },
        (error: Response) => {
          // console.log(error);
          switch (error.status) {
            case 409:
              this.signupError = "Username already exists";
              break;
            case 404:
              this.signupError = "Something went wrong";
              break;
            default:
              this.signupError = "Something went wrong";

              this.showSpinner = false;
          }
        }
      );
    }
  };
}
