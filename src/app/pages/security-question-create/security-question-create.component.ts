/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App security-question-create.component file
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { SecurityQuestionsService } from "../../services/security-questions.service";
import { SecurityQuestion } from "../../shared/interfaces/security-questions.interface";

@Component({
  selector: "app-security-question-create",
  templateUrl: "./security-question-create.component.html",
  styleUrls: ["./security-question-create.component.css"],
})
export class SecurityQuestionCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private securityQuestionsService: SecurityQuestionsService,
    private resultDialog: MatDialog,
  ) {}

  ngOnInit() {
    // This is for validators.
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  // This is the create function
  create() {
    const newSecurityQuestion = {} as SecurityQuestion;
    newSecurityQuestion.text = this.form.controls.text.value;
    // This function will be correct one the createSecurity API is created in the security-question.service
    this.securityQuestionsService.createSecurityQuestion(newSecurityQuestion).subscribe(
      (res) => {
        this.router.navigate(["/security-questions"]);
        this.resultDialog.open(ConfirmationDialogComponent, {
          data: {
            message: "New security question has been created successfully.",
          },
          disableClose: true,
          width: "fit-content",
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // This is the cancel button.
  cancel() {
    this.router.navigate(["/security-questions"]);
  }
}
