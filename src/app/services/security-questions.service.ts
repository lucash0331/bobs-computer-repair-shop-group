/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 23, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App services for security questions.
;===========================================
*/
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SecurityQuestion } from "../shared/interfaces/security-questions.interface";

@Injectable({
  providedIn: "root",
})
export class SecurityQuestionsService {
  constructor(private http: HttpClient) {}

  findAllSecurityQuestions(): Observable<any> {
    return this.http.get("/api/security-questions");
  }

  deleteSecurityQuestion(_id: string): Observable<any> {
    return this.http.delete("/api/security-questions/" + _id);
  }

  findSecurityQuestionById(_id: string): Observable<any> {
    return this.http.get("/api/security-questions/" + _id);
  }

  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any> {
    console.log(newSecurityQuestion);
    return this.http.post("/api/security-questions", {
      text: newSecurityQuestion.text,
    });
  }

  updateSecurityQuestion(_id: string, updatedSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.put("/api/security-questions/" + _id, {
      text: updatedSecurityQuestion.text,
    });
  }
}
