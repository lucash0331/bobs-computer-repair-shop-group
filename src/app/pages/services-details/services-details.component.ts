/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 23, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop user-details component
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ServicesService } from "src/app/services/services.service";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { Service } from "src/app/shared/interfaces/services.interface";
//import { ConfirmationService } from "primeng/api";
//import { MessageService } from "primeng/api";

@Component({
  selector: "app-services-details",
  templateUrl: "./services-details.component.html",
  styleUrls: ["./services-details.component.css"],
})
export class ServicesDetailsComponent implements OnInit {
  service: Service;
  userId: string;
  name: string;
  price: string;
  icon?: string;
  description: string;
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private resultDialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.userId = this.route.snapshot.paramMap.get("id");

    this.servicesService.findServiceById(this.userId).subscribe(
      (res) => {
        this.service = res["data"];
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.form.controls.name.setValue(this.service.name);
        this.form.controls.price.setValue(this.service.price);
        this.form.controls.icon.setValue(this.service.icon);
        this.form.controls.description.setValue(this.service.description);
      }
    );

    this.servicesService.findAllServices().subscribe(
      (res) => {
        this.service = res["data"];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      icon: [null, Validators.compose([])],
      description: [null, Validators.compose([])],
    });
  }

  saveService(): void {
    const updatedService: Service = {
      name: this.form.controls.name.value,
      price: this.form.controls.price.value,
      icon: this.form.controls.icon.value,
      description: this.form.controls.description.value,
    };
    this.servicesService.updateService(this.userId, updatedService).subscribe(
      (res) => {
        this.router.navigate(["/services"]);
      },
      (err) => {
        console.log(err);
      },
      () => {
        //alert("Services information is updated.");
        this.resultDialog.open(ConfirmationDialogComponent, {
          data: {
            message: "Services information has been updated successfully.",
          },
          disableClose: true,
          width: "fit-content",
        });
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/services"]);
    //alert("Service information is canceled.");
    this.resultDialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Services information updating has been canceled.",
      },
      disableClose: true,
      width: "fit-content",
    });
  }
}
