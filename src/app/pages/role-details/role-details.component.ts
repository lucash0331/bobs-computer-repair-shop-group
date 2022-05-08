/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint3
; Author: Professor Krasso
; Date: May 7, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop role-details component
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoleService } from "src/app/services/roles.service";
import { Role } from "src/app/shared/interfaces/role.interface";
//import { ConfirmationService } from "primeng/api";
//import { MessageService } from "primeng/api";

@Component({
  selector: "app-role-details",
  templateUrl: "./role-details.component.html",
  styleUrls: ["./role-details.component.css"],
})
export class RoleDetailsComponent implements OnInit {
  role: Role;
  text: string;
  userId: string;
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private fb: FormBuilder
  ) {
    this.userId = this.route.snapshot.paramMap.get("id");

    this.roleService.findRoleById(this.userId).subscribe(
      (res) => {
        this.role = res["data"];
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.form.controls.text.setValue(this.role.text);
      }
    );

    this.roleService.findAllRoles().subscribe(
      (res) => {
        this.role = res["data"];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }
  saveRole(): void {
    const updatedRole: Role = {
      text: this.form.controls.text.value,
    };
    this.roleService.updateRole(this.userId, updatedRole).subscribe(
      (res) => {
        this.router.navigate(["/roles"]);
      },
      (err) => {
        console.log(err);
      },
      () => {
        alert("Role information is updated.");
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/roles"]);
    alert("Role information is canceled.");
  }
}
