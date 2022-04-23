import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/shared/interfaces/user.interface";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  user: User[];
  displayedColumns = ["userName", "firstName", "lastName", "phoneNumber", "address", "email", "edit", "delete"];
  constructor(private userService: UserService) {
    this.userService.findAllUsers().subscribe(
      (res) => {
        this.user = res["data"];
      },
      (err) => {},
      () => {}
    );
  }

  ngOnInit(): void {}
}
