/*
============================================
; Title: WEB450 Bob's Computer Repair Shop Sprint1
; Author: Professor Krasso
; Date: April 24, 2022
; Modified By: House Gryffindor
; Description: Bob's Computer Repair Shop App app-routing.module.ts
; 
;===========================================
*/

import { HomeComponent } from "./pages/home/home.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { SecurityQuestionListComponent } from "./pages/security-question-list/security-question-list.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { AuthGuard } from "./shared/auth.guard";
import { SecurityQuestionDetailsComponent } from "./pages/security-question-details/security-question-details.component";
import { UserDetailsComponent } from "./pages/user-details/user-details.component";
import { UserCreateComponent } from "./pages/user-create/user-create.component";
import { SecurityQuestionCreateComponent } from "./pages/security-question-create/security-question-create.component";
import { VerifyUsernameFormComponent } from "./forms/verify-username-form/verify-username-form.component";
import { VerifySecurityQuestionsFormComponent } from "./forms/verify-security-questions-form/verify-security-questions-form.component";
import { ResetPasswordFormComponent } from "./forms/reset-password-form/reset-password-form.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ErrorComponent } from "./pages/error/error.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ServicesListComponent } from "./pages/services-list/services-list.component";
import { ServicesCreateComponent } from "./pages/services-create/services-create.component";
import { ServicesDetailsComponent } from "./pages/services-details/services-details.component";
import { PurchasesByServiceGraphComponent } from "./pages/purchases-by-service-graph/purchases-by-service-graph.component";
import { RoleGuard } from "./shared/role.guard";
import { InvoiceDialogComponent } from "./shared/invoice-dialog/invoice-dialog.component";
import { RoleListComponent } from "./pages/role-list/role-list.component";
import { RoleCreateComponent } from "./pages/role-create/role-create.component";
import { RoleDetailsComponent } from "./pages/role-details/role-details.component";
import { ConfirmationDialogComponent } from "./shared/confirmation-dialog/confirmation-dialog.component";

const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
        canActivate: [AuthGuard],
      },

      {
        path: "purchases-by-service-graph",
        component: PurchasesByServiceGraphComponent,
        canActivate: [AuthGuard],
      },

      {
        path: "user",
        component: UserListComponent,
        canActivate: [AuthGuard],
      },

      {
        path: "about",
        component: AboutComponent,
      },

      {
        path: "contact",
        component: ContactComponent,
      },

      {
        path: "security-questions",
        component: SecurityQuestionListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "security-questions/create/new",
        component: SecurityQuestionCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "security-questions/update/:id",
        component: SecurityQuestionDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "security-questions/create/new",
        component: SecurityQuestionCreateComponent,
        canActivate: [AuthGuard],
      },

      {
        path: "users",
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users/update/:id",
        component: UserDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users/create/new",
        component: UserCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users/user/profile",
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "services",
        component: ServicesListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "services/create/new",
        component: ServicesCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "services/update/:id",
        component: ServicesDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roles",
        component: RoleListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roles/create/new",
        component: RoleCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "roles/update/:id",
        component: RoleDetailsComponent,
        canActivate: [AuthGuard],
      },
      //dialogs
      {
        path: "order-summary",
        component: InvoiceDialogComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "confirmation",
        component: ConfirmationDialogComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "session",
    component: AuthLayoutComponent,
    children: [
      {
        path: "signin",
        component: SigninComponent,
      },
      {
        path: "forgot-password",
        component: VerifyUsernameFormComponent,
      },
      {
        path: "verify-security-questions",
        component: VerifySecurityQuestionsFormComponent,
      },
      {
        path: "reset-password",
        component: ResetPasswordFormComponent,
      },
      {
        path: "404",
        component: NotFoundComponent,
      },
      {
        path: "500",
        component: ErrorComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "session/404",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
