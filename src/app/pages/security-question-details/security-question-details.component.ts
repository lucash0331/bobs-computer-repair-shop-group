/*
============================================
; Title: WEB450 Bob's Computer Repair Shop SPrint1
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App security-question-details.component file
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { SecurityQuestionsService } from "src/app/services/security-questions.service";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { SecurityQuestion } from "src/app/shared/interfaces/security-questions.interface";

@Component({
  selector: "app-security-question-details",
  templateUrl: "./security-question-details.component.html",
  styleUrls: ["./security-question-details.component.css"],
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question: SecurityQuestion;
  questionId: string;
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private securityQuestionsService: SecurityQuestionsService,
    private fb: FormBuilder,
    private resultDialog: MatDialog

  ) {
    this.questionId = this.route.snapshot.paramMap.get("id");
    console.log(this.route.snapshot.paramMap);
    console.log(this.questionId);
    this.securityQuestionsService.findSecurityQuestionById(this.questionId).subscribe(
      (res) => {
        this.question = res["data"];
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.form.controls.text.setValue(this.question.text);
      }
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  saveQuestion(): void {
    const updatedSecurityQuestion: SecurityQuestion = {
      text: this.form.controls.text.value,
    };

    this.securityQuestionsService.updateSecurityQuestion(this.questionId, updatedSecurityQuestion).subscribe((res) => {
      this.router.navigate(["/security-questions"]);
      //alert("Security question is updated.");
      this.resultDialog.open(ConfirmationDialogComponent, {
        data: {
          message: "Security question has been updated successfully.",
        },
        disableClose: true,
        width: "fit-content",
      });
    });
  }

  cancel(): void {
    this.router.navigate(["/security-questions"]);
    //alert("Security question updating is canceled.");
    this.resultDialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Security question updating has been canceled.",
      },
      disableClose: true,
      width: "fit-content",
    });
  }
}
