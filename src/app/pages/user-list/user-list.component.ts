import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/shared/interfaces/user.interface";

// const ELEMENT_DATA: Services[] = [
//   { position: 1, userName: "Hydrogen", firstName: "Adam", lastName: "Rodgers", weight: 1.0079, symbol: "H" },
//   { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
//   { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
//   { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
//   { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
//   { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
//   { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
//   { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
//   { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
//   { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
// ];

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  user: User[];
  displayedColumns = ["userName", "firstName", "lastName", "phoneNumber", "address", "email"];
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
