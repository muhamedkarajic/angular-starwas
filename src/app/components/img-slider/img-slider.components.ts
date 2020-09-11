import { Component, Input, AfterViewInit } from "@angular/core";
import * as Splide from "@splidejs/splide";

@Component({
  selector: "img-slider",
  templateUrl: "./img-slider.component.html",
  styleUrls: ["./img-slider.component.scss"],
})
export class ImgSliderComponent implements AfterViewInit {
  @Input() urls: string[];

  currentActive: number = 0;
  ngAfterViewInit(): void {
    new Splide.default(".splide", {
      type: "slide",
      cover: true,
      arrows: false,
      rewind: true,
    }).mount();
  }
}
