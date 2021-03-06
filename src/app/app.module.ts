/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App app.module.ts
; 
;===========================================
*/

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./pages/home/home.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { SecurityQuestionListComponent } from "./pages/security-question-list/security-question-list.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { UserCreateComponent } from "./pages/user-create/user-create.component";
import { UserDetailsComponent } from "./pages/user-details/user-details.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { SecurityQuestionCreateComponent } from "./pages/security-question-create/security-question-create.component";
import { SecurityQuestionDetailsComponent } from "./pages/security-question-details/security-question-details.component";
import { PickListModule } from "primeng/picklist";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { MatTabsModule } from "@angular/material/tabs";
import { RegisterComponent } from "./pages/register/register.component";
import { ResetPasswordFormComponent } from "./forms/reset-password-form/reset-password-form.component";
import { VerifySecurityQuestionsFormComponent } from "./forms/verify-security-questions-form/verify-security-questions-form.component";
import { VerifyUsernameFormComponent } from "./forms/verify-username-form/verify-username-form.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { DialogModule } from "primeng/dialog";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ErrorComponent } from "./pages/error/error.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { AboutComponent } from "./pages/about/about.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ServicesListComponent } from "./pages/services-list/services-list.component";
import { ServicesCreateComponent } from "./pages/services-create/services-create.component";
import { ServicesDetailsComponent } from "./pages/services-details/services-details.component";
import { PurchasesByServiceGraphComponent } from "./pages/purchases-by-service-graph/purchases-by-service-graph.component";
import { ChartModule } from "primeng/chart";
import { InvoiceDialogComponent } from "./shared/invoice-dialog/invoice-dialog.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { RoleListComponent } from "./pages/role-list/role-list.component";
import { RoleCreateComponent } from "./pages/role-create/role-create.component";
import { RoleDetailsComponent } from "./pages/role-details/role-details.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    SecurityQuestionListComponent,
    SigninComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    RegisterComponent,
    ResetPasswordFormComponent,
    VerifySecurityQuestionsFormComponent,
    VerifyUsernameFormComponent,
    NotFoundComponent,
    ErrorComponent,
    ContactComponent,
    AboutComponent,
    UserProfileComponent,
    ServicesListComponent,
    ServicesCreateComponent,
    ServicesDetailsComponent,
    PurchasesByServiceGraphComponent,
    RoleListComponent,
    RoleCreateComponent,
    RoleDetailsComponent,
    InvoiceDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule,
    PickListModule,
    MatTableModule,
    ToastModule,
    ConfirmDialogModule,
    MatTabsModule,
    MessageModule,
    MessagesModule,
    MatStepperModule,
    MatListModule,
    MatSelectModule,
    DialogModule,
    ChartModule,
    MatGridListModule,
    MatButtonToggleModule,
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
