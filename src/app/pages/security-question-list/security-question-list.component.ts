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
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-security-question-list",
  templateUrl: "./security-question-list.component.html",
  styleUrls: ["./security-question-list.component.css"],
})
export class SecurityQuestionListComponent implements OnInit {
  securityQuestion: SecurityQuestion[];
  _id: string;
  displayedColumns = ["text", "isDisabled", "edit", "delete"];

  constructor(
    private dialog: MatDialog,
    private securityQuestionsService: SecurityQuestionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.securityQuestionsService.findAllSecurityQuestions().subscribe(
      (res) => {
        this.securityQuestion = res["data"];
      },
      (err) => {},
      () => {}
    );
  }

  ngOnInit(): void {}

  //Delete task function
  deleteSecurityQuestion(_id: string) {
    console.log(_id);
    this.confirmationService.confirm({
      message: "Are you sure you want to delete this security question?",
      accept: () => {
        if (_id) {
          this.securityQuestionsService.deleteSecurityQuestion(_id).subscribe(
            (res) => {
              this.securityQuestion = res.data;
            },
            (err) => {
              console.log(err);
            },
            () => {
              this.securityQuestion = this.securityQuestion.filter((q) => q._id !== _id);

              this.messageService.add({ severity: "warn", summary: "bcrs", detail: "Security question deleted" });
            }
          );
        }
      },
    });
  }
}
