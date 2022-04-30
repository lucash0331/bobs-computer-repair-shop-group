/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App signin.component file
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
//import { SigninService } from 'src/app/shared/services/sign-in.service';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;

  contactForm: FormGroup;
  securityQuestionsForm: FormGroup;
  credentialsForm: FormGroup;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) {}

  //password validation pattern added

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      address: [null, Validators.compose([Validators.required])],
    });
    this.securityQuestionsForm = this.fb.group({
      securityQuestion1: [null, Validators.compose([Validators.required])],
      securityQuestion2: [null, Validators.compose([Validators.required])],
      securityQuestion3: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])],
    });
    this.credentialsForm = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")])],
    });
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  // Register function
  register() {}

  onSubmit(): void {
    const userName = this.form.controls.userName.value;
    const password = this.form.controls.password.value;

    this.http
      .post("/api/session/signin", {
        userName,
        password,
      })
      .subscribe(
        (res) => {
          if (res["data"].userName) {
            this.cookieService.set("session_user", res["data"].userName, 1);
            // Need to be able to send lastName and firstName to home page to display in menu.

            sessionStorage.setItem("name", `${res["data"].firstName} ${res["data"].lastName}`);
            this.router.navigate(["/"]);
            console.log(res["data"].userName);
            console.log(res["data"].firstName);
            console.log(res["data"].lastName);
          }
        },
        (err) => {
          console.log("error");
          console.log(err);
          this.errorMessage = err.error.msg;
        }
      );
  }
}
