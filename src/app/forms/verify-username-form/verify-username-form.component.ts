/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App VerifyUsernameFormComponent file
;===========================================
*/
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Message } from "primeng/api/message";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-verify-username-form",
  templateUrl: "./verify-username-form.component.html",
  styleUrls: ["./verify-username-form.component.css"],
})
export class VerifyUsernameFormComponent implements OnInit {
  form: FormGroup;
  errorMessages: Message[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

 ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
    });
  }

  validateUsername(): void {
    const username = this.form.controls.userName.value;

    //this.http.get("/api/session/verify/users/" + username).subscribe(
    this.http.get("/api/users/" + username).subscribe(
      (res) => {
        this.router.navigate(["/session/verify-security-questions"], {
          queryParams: { username: username },
          skipLocationChange: true,
        });
        console.log(res);
      },
      (err) => {
        this.errorMessages = [
          {
            severity: "error",
            summary: "Error",
            detail: err['message'],
          },
        ];
        console.log(err);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/session/signin"]);
  
  }
}
