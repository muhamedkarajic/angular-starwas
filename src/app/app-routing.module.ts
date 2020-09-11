import { ObjectDetailsComponent } from './components/object-details/object-details.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ObjectCardsComponent } from "./components/object-cards/object-cards.component";

const routes: Routes = [
  {
    path: "",
    component: ObjectCardsComponent,
  },
  {
    path: "details",
    component: ObjectDetailsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
