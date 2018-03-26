import { Component, OnInit } from "@angular/core";
import { StandardService } from "../../services/standard.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "standard-upload",
  templateUrl: "./standard-upload.component.html",
  styleUrls: ["./standard-upload.component.css"]
})
export class StandardUploadComponent implements OnInit {
  fileName;
  data;
  showSpinner;

  constructor(private service: StandardService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    //To style input button,its hidden and another proxy element is linked to it
    let fileInput = document.getElementById("file-input");
    let customInput = document.getElementById("custom-file-input");

    customInput.addEventListener("click", () => {
      fileInput.click();
      //console.log(fileInput);
    });

    //storing the file's name
    fileInput.addEventListener("change", event => {
      this.fileName = (event.target as HTMLInputElement).value.replace(
        /^.*[\\\/]/,
        ""
      );
      customInput.innerText = this.fileName;
    });
  }

  //encoding the file to base64 string
  encodeFile() {
    let doc = document.querySelector("input[type=file]") as HTMLInputElement;
    let file = doc.files[0];

    let dataPromise = new Promise((resolve, reject) => {
      let reader = new FileReader() as any;
      reader.onload = function(event) {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = function(error) {
        reject(error);
        console.log("Error: ", error);
      };

      reader.readAsDataURL(file);
    }).then(base64 => {
      this.data = base64;
    });
  }

  onUpload() {
    this.showSpinner = true;
    let body = {
      schoolId: "test-user",
      filename: this.fileName,
      data: this.data
    };

    this.service.uploadStandards(body).subscribe(
      response => {
        if (response.status === 201) {
          this.snackBar.open("Standards uploaded!", "OK", {
            duration: 2000
          });
        } else {
          this.snackBar.open("Something went wrong", "OK", {
            duration: 2000
          });
        }
        this.data = "";
        this.fileName = "";
        this.showSpinner = false;
        document.getElementById("custom-file-input").innerText = "Choose file";
      },
      (error: Response) => {
        switch (error.status) {
          default:
            this.snackBar.open("Something went wrong", "OK", {
              duration: 2000
            });
            this.data = "";
            this.fileName = "";
            this.showSpinner = false;
        }
      }
    );
  }
}
