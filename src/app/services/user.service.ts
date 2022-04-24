/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App user.service file
; 
;===========================================
*/

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../shared/interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  createUser(newUser: User) {
    throw new Error("Method not implemented.");
  }
  constructor(private http: HttpClient) {}

  findAllUsers(): Observable<any> {
    return this.http.get("/api/users");
  }

  deleteUser(_id: string): Observable<any> {
    return this.http.delete("/api/users/:id");
  }
}
