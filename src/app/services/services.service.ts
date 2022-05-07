/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App services.service component
; 
;===========================================
*/

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Service } from "../shared/interfaces/services.interface";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  findAllServices(): Observable<any> {
    return this.http.get("/api/services");
  }

  findServiceById(_id: string): Observable<any> {
    return this.http.get("/api/services/" + _id);
  }

  deleteService(_id: string): Observable<any> {
    return this.http.delete("/api/services/" + _id);
  }

  updateService(_id: string, updatedService: Service): Observable<any> {
    const result = this.http.put("/api/services/update/" + _id, {
      name: updatedService.name,
      price: updatedService.price,
      icon: updatedService.icon,
      description: updatedService.description,
    });
    return result;
  }

  createService(newService: Service): Observable<any> {
    console.log(newService);
    return this.http.post("/api/services", {
      name: newService.name,
      price: newService.price,
      icon: newService.icon,
      description: newService.description,
    });
  }
}
