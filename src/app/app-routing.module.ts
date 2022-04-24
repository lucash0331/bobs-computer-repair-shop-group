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
        path: "user",
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "security-questions",
        component: SecurityQuestionListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "security-questions/update/:id" ,
        component: SecurityQuestionDetailsComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "users",
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users/update/:id" ,
        component: UserDetailsComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "users/create/new" ,
        component: UserCreateComponent,
        // canActivate: [AuthGuard],
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
    ],
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
