/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint3
; Author: Professor Krasso
; Date: May 7, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop user-list component
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { Service } from "src/app/shared/interfaces/services.interface";
import { CookieService } from "ngx-cookie-service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { ServicesService } from "src/app/services/services.service";

@Component({
  selector: "app-services-list",
  templateUrl: "./services-list.component.html",
  styleUrls: ["./services-list.component.css"],
})
export class ServicesListComponent implements OnInit {
  service: Service;
  name: string;
  _id: string;
  displayedColumns = ["name", "price", "icon", "description", "edit", "delete"];
  constructor(
    private servicesService: ServicesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.servicesService.findAllServices().subscribe(
      (res) => {
        this.service = res["data"];
      },
      (err) => {},
      () => {}
    );
  }

  ngOnInit(): void {}

  deleteService(_id: string) {
    console.log(_id);
    // Rerouted function through PrimeNG ConfirmDialog
    this.confirmationService.confirm({
      message: "Are you sure you want to delete this service?",
      accept: () => {
        if (_id) {
          this.servicesService.deleteService(_id).subscribe(
            (res) => {
              //this.user = res.data;
              this.servicesService.findAllServices().subscribe(
                (res) => {
                  this.service = res["data"];
                },
                (err) => {},
                () => {}
              );
            },
            (err) => {
              console.log(err);
            },
            () => {
              //this._id = this.user._id;
              // PrimeNG Toast message sender
              this.messageService.add({ severity: "warn", summary: "bcrs", detail: "Service deleted successfully" });
            }
          );
        }
      },
    });
  }
}
