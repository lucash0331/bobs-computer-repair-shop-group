/*
============================================
<<<<<<< HEAD
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 23, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop user-details component
=======
; Title: WEB450 Bob's Computer Repair SHop
; Author: Professor Krasso
; Date: April 23, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App security-question-details.component file
>>>>>>> 26be4755a6a077caf224044df7999ec82cb874c3
;===========================================
*/

import { Component, OnInit } from "@angular/core";
<<<<<<< HEAD
=======
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {UserService } from "src/app/services/user.service";
import { User } from "src/app/shared/interfaces/user.interface";
>>>>>>> 26be4755a6a077caf224044df7999ec82cb874c3

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
<<<<<<< HEAD
  constructor() {}

  ngOnInit(): void {}
=======
  user: User;
  userId: string;

  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userId = this.route.snapshot.paramMap.get("id");
    console.log(this.route.snapshot.paramMap);
    console.log(this.userId);
    this.userService
      .findUserById(this.userId)
      .subscribe(
        (res) => {
          this.user = res["data"];
          console.log("1");
          console.log(this.user);
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.form.controls.firstName.setValue(this.user.firstName);
          this.form.controls.lastName.setValue(this.user.lastName);
          this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
          this.form.controls.address.setValue(this.user.address);
          this.form.controls.email.setValue(this.user.email);
          this.form.controls.role.setValue(this.user.role);
        }
      );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      role: [{}, Validators.compose([Validators.required])],

    });
  }

  saveUser(): void {
    const updatedUser: User = {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      address: this.form.controls.address.value,
      email: this.form.controls.email.value,
      role: this.form.controls.role.value

    };

    this.userService
      .updateUser(this.userId, updatedUser)
      .subscribe((res) => {
        this.router.navigate(["/users"]);
        alert("User information is updated.");
      });
  }

  cancel(): void {
    this.router.navigate(["/users"]);
    alert("User information is canceled.");
  }
>>>>>>> 26be4755a6a077caf224044df7999ec82cb874c3
}
