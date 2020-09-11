import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "preview-urls",
  templateUrl: "./preview-urls.component.html",
  styleUrls: ["./preview-urls.component.scss"],
})
export class PreviewUrlsComponent implements OnInit {
  @Input() title: string = null;
  @Input() urls: string[] = [];
  @Input() objects: any[] = [];

  previewAll: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    if (this.urls) {
      this.objects = [];
      this.fetchUrls(false);
    }
  }

  fetchUrls(previewAll) {
    let i;
    for (
      i = this.objects.length;
      i < this.urls.length && (i < 3 || previewAll);
      i++
    ) {
      const url = this.urls[i];
      this.httpClient.get(url.replace('http', 'https')).subscribe((object) => this.objects.push(object));
    }
    this.previewAll = this.urls.length == i || previewAll;
  }
}
