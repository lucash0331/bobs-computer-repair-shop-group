import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityQuestionsService } from '../../services/security-questions.service'
import { SecurityQuestion } from '../../shared/interfaces/security-questions.interface';


@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {

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
}
