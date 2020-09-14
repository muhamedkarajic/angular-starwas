import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ObjectService } from "src/app/services/object.service";

@Component({
  selector: "object-details",
  templateUrl: "./object-details.component.html",
  styleUrls: ["./object-details.component.scss"],
})
export class ObjectDetailsComponent {
  object$: Observable<any>
  titlePrefix: string = null;

  constructor(
    private httpClient: HttpClient,
    public objectService: ObjectService
  ) {

      this.objectService.target$.subscribe(target => this.titlePrefix = target);
      this.objectService.url$.subscribe(url =>
        this.object$ = this.httpClient.get<any>(url)
      );

  }

}
