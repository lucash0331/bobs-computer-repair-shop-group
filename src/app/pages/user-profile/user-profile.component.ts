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
import { Role } from "src/app/shared/interfaces/role-interface";
import { RoleService } from "src/app/services/roles.service";
import { CookieService } from "ngx-cookie-service";

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private cookieService: CookieService //private confirmationService: ConfirmationService, //private messageService: MessageService
  ) {
    this.userName = this.cookieService.get("session_user");
    //console.log(this.route.snapshot.paramMap);
    console.log(this.userName);
    this.readonly = true;
    this.edit = false;
    this.userService.findUserByUserName(this.userName).subscribe(
      (res) => {
        this.user = res["data"];
        this.userId = this.user._id;
        console.log("1");
        console.log(this.user.role.role);
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
  }

  saveUser(): void {
    const updatedUser: User = {
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
      },
      (err) => {
        console.log(err);
      },
     /*  () => {
        alert("User information is updated.");
      } */
    );
  }

  cancel(): void {
    this.edit = false;
    this.readonly = true;
    //alert("User information is canceled.");
  }

  exit(): void {
    this.router.navigate(["/"]);
  }

  editProfile() {
    this.edit = true;
    this.readonly = false;
  }
}
