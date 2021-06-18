import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "preview-urls",
  templateUrl: "./preview-urls.component.html",
  styleUrls: ["./preview-urls.component.scss"],
})
export class PreviewUrlsComponent implements OnInit {
  @Input() target: string[] = [];
  @Input() links: any[] = [];
  fetchedObjects: number = 0;

  previewAll: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
      this.fetchUrls(false);
  }

  fetchUrls(previewAll) {
    for (;
      this.fetchedObjects < this.links.length && (this.fetchedObjects < 3 || previewAll);
      this.fetchedObjects++
    ) {
      const link = this.links[this.fetchedObjects];
      this.httpClient.get(link.url).subscribe((object) => link['object'] = object );
    }
    this.previewAll = this.links.length == this.fetchedObjects || previewAll;
    console.log(this.links);

  }
}
