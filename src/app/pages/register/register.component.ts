/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint2
; Author: Professor Krasso
; Date: April 28, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App register component
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { SecurityQuestion } from "../../shared/interfaces/security-questions.interface";
import { SecurityQuestionsService } from "src/app/services/security-questions.service";
import { CookieService } from "ngx-cookie-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Message } from "primeng/api/message";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
