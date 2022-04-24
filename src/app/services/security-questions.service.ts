import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
}
