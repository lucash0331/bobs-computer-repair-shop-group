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

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  service: Service;
  name: String;
  price: String;

  displayedColumns = ["name", "price"];

  // total: number = 0;
  // products: Array<IProduct>
  //@ViewChild(MatTable) table: MatTable<any>;
  // dataTableSource = [];

  constructor(
    private servicesService: ServicesService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.servicesService.findAllServices().subscribe(
      (res) => {
        this.service = res["data"];
      },
      (err) => {},
      () => {}
    );

    //this.invoice = new Invoice(cookieService.get('session_user'));
  }

  ngOnInit() {}
}
