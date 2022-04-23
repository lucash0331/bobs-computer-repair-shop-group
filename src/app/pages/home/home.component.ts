import { Component, OnInit } from "@angular/core";
import { ServicesService } from "src/app/services/services.service";
import { Service } from "src/app/shared/interfaces/services.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  list1: Service[];
  list2: Service[];

  constructor(private servicesService: ServicesService) {
    this.servicesService.findAllServices().subscribe(
      (res) => {
        this.list1 = res["data"];
        this.list2 = res["data"];
      },
      (err) => {},
      () => {}
    );
  }

  ngOnInit() {}
}
