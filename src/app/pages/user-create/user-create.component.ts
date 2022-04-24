/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop user-create component
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/shared/interfaces/user.interface";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"],
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit() {
    // validations
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  // create function for new users
  create() {
    const newUser = {} as User;
    newUser.userName = this.form.controls.userName.value;
    newUser.password = this.form.controls.password.value;
    newUser.firstName = this.form.controls.firstName.value;
    newUser.lastName = this.form.controls.lastName.value;
    newUser.phoneNumber = this.form.controls.phoneNumber.value;
    newUser.address = this.form.controls.address.value;
    newUser.email = this.form.controls.email.value;

    // createUser service method to make network call to create user
     this.userService.createUser(newUser).subscribe(
       (res) => {
         this.router.navigate(['/users']);
       },
       (err) => {
         console.log(err);
       }
     );
  }

  // This is the cancel button.
  cancel() {
    this.router.navigate(["/users"]);
  }
}