import { HomeComponent } from "./pages/home/home.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "./pages/user-list/user-list.component";

const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "user",
        component: UserListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: "enabled", relativeLinkResolution: "legacy" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
