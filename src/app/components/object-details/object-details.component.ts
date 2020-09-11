import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ObjectService } from "src/app/services/object.service";

@Component({
  selector: "object-details",
  templateUrl: "./object-details.component.html",
  styleUrls: ["./object-details.component.scss"],
})
export class ObjectDetailsComponent {
  object$: Observable<any>

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    public objectService: ObjectService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.titlePrefix = this.objectService.getTitlePrefix(params.url);
      this.object$ = this.httpClient.get<any>(params.url.replace('http', 'https'));
      this.object$.subscribe(s => console.log('object',s));
    });
  }

  titlePrefix: string = null;
}
