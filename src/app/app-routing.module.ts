import { ObjectDetailsComponent } from './components/object-details/object-details.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ObjectCardsComponent } from "./components/object-cards/object-cards.component";

const routes: Routes = [
  {
    path: ":target",
    component: ObjectCardsComponent,
  },
  {
    path: ":target/:id",
    component: ObjectDetailsComponent,
  },
  {
    path: "",
    redirectTo: "/films",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
