/*
============================================
; Title: WEB450 Bob's Computer Repair SHop
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
    return this.http.delete("/api/security-questions" + _id);
  }

  findSecurityQuestionById(_id: string): Observable<any> {
    return this.http.get("/api/security-questions/" + _id);
  }

  updateSecurityQuestion(
    _id: string,
    updatedSecurityQuestion: SecurityQuestion
  ): Observable<any> {
    return this.http.put("/api/security-questions/" + _id, {
      text: updatedSecurityQuestion.text,
    });
  }
}
