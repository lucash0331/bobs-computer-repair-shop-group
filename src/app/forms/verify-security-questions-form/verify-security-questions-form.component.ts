/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App VerifySecurityQuestionsFormComponent file
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Message } from "primeng/api/message";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-verify-security-questions-form",
  templateUrl: "./verify-security-questions-form.component.html",
  styleUrls: ["./verify-security-questions-form.component.css"],
})
export class VerifySecurityQuestionsFormComponent implements OnInit {
  form: FormGroup;
  errorMessages: Message[];
  username: string;
  selectedSecurityQuestions: any;
  question1: string;
  question2: string;
  question3: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.username = this.route.snapshot.queryParamMap.get("username");
    //this.username = "LenaLee";
    this.http
      .get("/api/users/" + this.username + "/security-questions")
      .subscribe(
        (res) => {
          console.log(res["data"]);
          this.selectedSecurityQuestions = res["data"];
          
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.question1 = this.selectedSecurityQuestions[0].questionText;
          this.question2 = this.selectedSecurityQuestions[1].questionText;
          this.question3 = this.selectedSecurityQuestions[2].questionText;
          console.log(this.question1);
          console.log(this.question2);
          console.log(this.question3);

        }
      );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      answer1: [null, Validators.compose([Validators.required])],
      answer2: [null, Validators.compose([Validators.required])],
      answer3: [null, Validators.compose([Validators.required])],
    });
  }

  verifySecurityQuestions(): void {
    const answerToQuestion1 = this.form.controls["answer1"].value;
    const answerToQuestion2 = this.form.controls["answer2"].value;
    const answerToQuestion3 = this.form.controls["answer3"].value;

    this.http
      .post(
        "/api/session/verify/users/" + this.username + "/security-questions",
        {
          question1: this.question1,
          question2: this.question2,
          question3: this.question3,
          answer1: answerToQuestion1,
          answer2: answerToQuestion2,
          answer3: answerToQuestion3,
        }
      )
      .subscribe((res) => {
        console.log(res["msg"]);
        if (res["msg"] === "Answers are correct") {
          this.router.navigate(["/session/reset-password"], {
            queryParams: { isAuthenticated: "true", username: this.username },
            skipLocationChange: true,
          });
        } else {
          this.errorMessages = [
            {
              severity: "error",
              summary: "Error",
              detail: "Security questions are not verified.",
            },
          ];
          console.log("Security questions are not verified.");
        }
      });
  }

  cancel(): void {
    this.router.navigate(["/session/signin"]);
  }
}
