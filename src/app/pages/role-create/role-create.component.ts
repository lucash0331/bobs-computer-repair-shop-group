import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { RoleService } from "src/app/services/roles.service";
import { Role } from "src/app/shared/interfaces/role.interface";

@Component({
  selector: "app-role-create",
  templateUrl: "./role-create.component.html",
  styleUrls: ["./role-create.component.css"],
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private roleService: RoleService) {}

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }
  createRole() {
    const newRole = {} as Role;
    newRole.text = this.form.controls.text.value;

    this.roleService.createRole(newRole).subscribe(
      (res) => {
        this.router.navigate(["/roles"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
