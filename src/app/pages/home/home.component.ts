/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App home.component file
;===========================================
*/

import { Component, OnInit } from "@angular/core";
import { ServicesService } from "src/app/services/services.service";
import { Service } from "src/app/shared/interfaces/services.interface";
import { MatTable } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { CookieService } from "ngx-cookie-service";
import { MessageService } from "primeng/api";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Invoice } from "src/app/shared/models/invoice";
import { InvoiceService } from "src/app/services/invoice.service";
import { InvoiceDialogComponent } from "src/app/shared/invoice-dialog/invoice-dialog.component";
import { LineItem } from "src/app/shared/interfaces/line-item.interface";
import { Message } from "primeng/api/message";
import { title } from "process";
import { Router } from "@angular/router";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  userName: string;
  service: Service[];
  lineItems: LineItem[];
  invoice: Invoice;
  name: String;
  price: String;
  errorMessages: Message[];
  successMessages: Message[];

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private resultDialog: MatDialog,
    private http: HttpClient,
    private cookieService: CookieService,
    private InvoiceService: InvoiceService,
    private router: Router
  ) {
    this.servicesService.findAllServices().subscribe(
      (res) => {
        this.service = res["data"];
        console.log(this.service);
      },
      (err) => {},
      () => {}
    );
    this.userName = this.cookieService.get("session_user");
    this.invoice = new Invoice(this.userName);
    this.lineItems = [];
  }

  ngOnInit() {
    this.form = this.fb.group({
      parts: [null, [Validators.pattern("^[0-9]*[.]?[0-9]+$")]],
      labor: [null, [Validators.pattern("^[0-9]*[.]?[0-9]+$")]],
    });
  }

  generateInvoice() {
    console.log(this.service);
    for (let service of this.service) {
      if (service.checked) {
        console.log(service);
        this.lineItems.push(service);
      }
    }

    this.invoice.partsAmount = this.form.controls.parts.value;
    this.invoice.laborHours = this.form.controls.labor.value;

    console.log(this.lineItems);

    if (this.lineItems.length > 0) {
      this.invoice.setLineItems(this.lineItems);

      const dialog = this.dialog.open(InvoiceDialogComponent, {
        data: {
          invoice: this.invoice,
        },
        disableClose: true,
        width: "800px",
      });

      dialog.afterClosed().subscribe((result) => {
        if (result === "confirm") {
          this.InvoiceService.createInvoice(
            this.userName,
            this.invoice
          ).subscribe((res) => {
            this.reloadServices();
            this.clearLineItems();
            this.invoice.clear();
            this.redirect();
            console.log(res);
            this.resultDialog.open(ConfirmationDialogComponent, {
              data: {
                message: "Your order has been processed successfully.",
              },
              disableClose: true,
              width: "fit-content",
            });
        

            /*  this.successMessages = [
              {
                severity: "Success",
                summary: "Success",
                detail: "Your order has been processed successfully.",
              },
            ]; */
          });
        } else {
          this.resultDialog.open(ConfirmationDialogComponent, {
            data: {
              message: "Your order has been canceled.",
            },
            disableClose: true,
            width: "fit-content",
          });
          this.reloadServices();
          this.clearLineItems();
          this.invoice.clear();
          this.redirect();
        }
      });
    } else {
      this.errorMessages = [
        {
          severity: "error",
          summary: "Error",
          detail: "You must select at least one service.",
        },
      ];
    }
    // submit(): void {
    //   console.log("submitted");
    // }
  }

  reloadServices() {
    for (let service of this.service) {
      service.checked = false;
    }
  }
  clearLineItems() {
    this.lineItems = [];
  }

  redirect() {
    this.router
      .navigateByUrl("/about", { skipLocationChange: true })
      .then(() => {
        this.router.navigate(["/"]);
      });
  }
}
