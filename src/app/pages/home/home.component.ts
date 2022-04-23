import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  list1: any[];

  list2: any[];

  ngOnInit() {
    (this.list1 = ["test1", "test2", "test3"]), (this.list2 = ["test4", "test5", "test6"]);
  }

  constructor() {}
}
