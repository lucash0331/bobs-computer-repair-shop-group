<<<<<<< HEAD
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
=======
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityQuestionsService } from '../../services/security-questions.service'
import { SecurityQuestion } from '../../shared/interfaces/security-questions.interface';

>>>>>>> 26be4755a6a077caf224044df7999ec82cb874c3

@Component({
  selector: "app-security-question-create",
  templateUrl: "./security-question-create.component.html",
  styleUrls: ["./security-question-create.component.css"],
})
export class SecurityQuestionCreateComponent implements OnInit {
  constructor() {}

<<<<<<< HEAD
  ngOnInit(): void {}
=======
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private securityQuestionsService: SecurityQuestionsService
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
    this.securityQuestionsService
      .createSecurityQuestion(newSecurityQuestion)
      .subscribe(
        (res) => {
          this.router.navigate(['/security-questions']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // This is the cancel button.
  cancel() {
    this.router.navigate(['/security-questions']);
  }
>>>>>>> 26be4755a6a077caf224044df7999ec82cb874c3
}
