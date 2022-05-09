/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: May 5, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop user-details component
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/shared/interfaces/user.interface";
//import { ConfirmationService } from "primeng/api";
//import { MessageService } from "primeng/api";
import { Role } from "src/app/shared/interfaces/role.interface";
import { RoleService } from "src/app/services/roles.service";
import { CookieService } from "ngx-cookie-service";
import { SecurityQuestion } from "src/app/shared/interfaces/security-questions.interface";
import { SecurityQuestionsService } from "src/app/services/security-questions.service";
import { HttpClient } from "@angular/common/http";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  user: User;
  userId: string;
  userName: string;
  roles: Role[];
  form: FormGroup;
  name: string;
  readonly: Boolean;
  edit: Boolean;
  passwordForm: FormGroup;
  securityQuestionsForm: FormGroup;
  errorMessage: string;
  securityQuestions: SecurityQuestion[];
  isFilled: string;
  selectedRole: string;
  selectedIndex: number = 0;
  isSelectedSecurityQuestions: Boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private resultDialog: MatDialog,
    private cookieService: CookieService, //private confirmationService: ConfirmationService, //private messageService: MessageService
    private securityQuestionsService: SecurityQuestionsService,
    private http: HttpClient
  ) {
    this.userName = this.cookieService.get("session_user");
    //console.log(this.route.snapshot.paramMap);
    console.log(this.userName);
    this.readonly = true;
    this.edit = false;
    this.isFilled = "";
    this.http
      .get("/api/users/" + this.userName + "/security-questions")
      .subscribe(
        (res) => {
          console.log(res["data"]);
          this.isSelectedSecurityQuestions =
            res["data"].length > 0 ? true : false;
          console.log(this.isSelectedSecurityQuestions);
        },
        (err) => {
          console.log("ERROR");
          console.log(err.message);
        }
      );
    if (!this.isSelectedSecurityQuestions) {
      this.securityQuestionsService.findAllSecurityQuestions().subscribe(
        (res) => {
          this.securityQuestions = res["data"];
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([])],
      address: [null, Validators.compose([])],
      email: [null, Validators.compose([Validators.email])],
      role: [null, Validators.compose([])],
    });

    this.userService.findUserByUserName(this.userName).subscribe(
      (res) => {
        this.user = res["data"];
        this.userId = this.user._id;
        this.selectedRole = this.user.role.role;
        console.log("1");
        console.log(this.selectedRole);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("inside findUserById ");
        this.form.controls.userName.setValue(this.user.userName);
        this.form.controls.firstName.setValue(this.user.firstName);
        this.form.controls.lastName.setValue(this.user.lastName);
        this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
        this.form.controls.address.setValue(this.user.address);
        this.form.controls.email.setValue(this.user.email);
        this.form.controls.role.setValue(this.user.role.role);
        console.log(this.user.role["role"]);
        console.log(this.form.controls.role.value);
        console.log(this.form.controls.userName.value);
      }
    );

    // Sign-up/register form portion

    this.securityQuestionsForm = this.fb.group({
      securityQuestion1: [null, Validators.compose([Validators.required])],
      securityQuestion2: [null, Validators.compose([Validators.required])],
      securityQuestion3: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion1: [
        null,
        Validators.compose([Validators.required]),
      ],
      answerToSecurityQuestion2: [
        null,
        Validators.compose([Validators.required]),
      ],
      answerToSecurityQuestion3: [
        null,
        Validators.compose([Validators.required]),
      ],
    });
    this.passwordForm = this.fb.group({
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"),
        ]),
      ],
    });
  }

  saveUser(): void {
    const updatedUser: User = {
      userName: this.form.controls.userName.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      address: this.form.controls.address.value,
      email: this.form.controls.email.value,
      selectedSecurityQuestions: this.user.selectedSecurityQuestions,
      role: this.form.controls.role.value,
    };
    console.log(updatedUser);
    this.userService.updateUser(this.userId, updatedUser).subscribe(
      (res) => {
        this.edit = false;
        this.readonly = true;
        this.isFilled = "";
      },
      (err) => {
        console.log(err);
      },
      () => {
        //alert("User information is updated.");
        this.resultDialog.open(ConfirmationDialogComponent, {
          data: {
            message: "User information has been updated successfully.",
          },
          disableClose: true,
          width: "fit-content",
        });
      }
    );
  }

  cancelProfile(): void {
    this.edit = false;
    this.readonly = true;
    this.isFilled = "";
    //alert("User information is canceled.");
    this.resultDialog.open(ConfirmationDialogComponent, {
      data: {
        message: "User information updating has been canceled.",
      },
      disableClose: true,
      width: "fit-content",
    });
  }

  exit(): void {
    this.router.navigate(["/"]);
  }

  editProfile(): void {
    this.edit = true;
    this.readonly = false;
    this.isFilled = "fill";
  }

  // Register function
  saveSelectedQuestions() {
    const securityQuestions = this.securityQuestionsForm.value;
    console.log(securityQuestions);

    const selectedSecurityQuestions = [
      {
        questionText: securityQuestions.securityQuestion1,
        answerText: securityQuestions.answerToSecurityQuestion1,
      },
      {
        questionText: securityQuestions.securityQuestion2,
        answerText: securityQuestions.answerToSecurityQuestion2,
      },
      {
        questionText: securityQuestions.securityQuestion3,
        answerText: securityQuestions.answerToSecurityQuestion3,
      },
    ];
    console.log(selectedSecurityQuestions);
    this.userService
      .saveSelectedSecurityQuestions(this.userId, selectedSecurityQuestions)
      .subscribe(
        (res) => {
          this.isSelectedSecurityQuestions = true;
        },
        (err) => {
          console.log(err);
        },
        () => {
          //alert("Security questions is saved.");
          this.resultDialog.open(ConfirmationDialogComponent, {
            data: {
              message: "Security question has been saved successfully.",
            },
            disableClose: true,
            width: "fit-content",
          });
        }
      );
  }
  resetPassword(): void {
    console.log(this.passwordForm.controls["password"].value);
    this.http
      .post("/api/session/users/" + this.userName + "/reset-password", {
        password: this.passwordForm.controls["password"].value,
      })
      .subscribe(
        (res) => {
          this.router.navigate(["/"]);
          console.log(res);
        },
        (err) => {
          console.log(err);
        },
        () => {
          //alert("New password is saved.");
          this.resultDialog.open(ConfirmationDialogComponent, {
            data: {
              message: "Password has been changed successfully.",
            },
            disableClose: true,
            width: "fit-content",
          });
        }
      );
  }
}
