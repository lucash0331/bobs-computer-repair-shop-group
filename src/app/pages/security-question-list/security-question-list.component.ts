/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: April 23, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App security-questions.component file
; n
;===========================================
*/

import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { SecurityQuestion } from "../../shared/interfaces/security-questions.interface";
import { SecurityQuestionsService } from "src/app/services/security-questions.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-security-question-list",
  templateUrl: "./security-question-list.component.html",
  styleUrls: ["./security-question-list.component.css"],
})
export class SecurityQuestionListComponent implements OnInit {
  securityQuestion: SecurityQuestion[];
  displayedColumns = ["text", "isDisabled", "edit", "delete"];

  constructor(private dialog: MatDialog, private securityQuestionsService: SecurityQuestionsService) {
    this.securityQuestionsService.findAllSecurityQuestions().subscribe(
      (res) => {
        this.securityQuestionsService = res["data"];
      },
      (err) => {},
      () => {}
    );
  }

  ngOnInit(): void {}
}
