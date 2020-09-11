import { AppComponent } from "./components/app/app.component";
import { PreviewUrlsComponent } from "./components/preview-urls/preview-urls.component";
import { ImgSliderComponent } from "./components/img-slider/img-slider.components";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from "./components/layout/header/header.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { ObjectDetailsComponent } from "./components/object-details/object-details.component";
import { ObjectCardsComponent } from "./components/object-cards/object-cards.component";
import { ObjectCardComponent } from "./components/object-card/object-card.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    ObjectCardComponent,
    ObjectCardsComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    ObjectDetailsComponent,
    ImgSliderComponent,
    PreviewUrlsComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
