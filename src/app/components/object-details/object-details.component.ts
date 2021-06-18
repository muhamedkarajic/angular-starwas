import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ObjectService } from "src/app/services/object.service";
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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
    this.object$ = this.fetchObject(this.route.snapshot.params.target, this.route.snapshot.params.id)
      .pipe(map(response => {
        let x = response['arrayDetails'] = {}
        for (const [key, value] of Object.entries(response))
          if (objectService.isArray(value) && (value as any).length) {
            let urls = value as string[];
            x[key] = {
              target: objectService.getTitlePrefix(urls[0]),
              links: urls.map(url => ({ id: objectService.getId(url), url: url }))
            }
          }
          console.log(response);
        return response;
      }));
  }


  fetchObject(target: string, id: string) {
    return this.httpClient
      .get<any>(
        environment.baseUrl + `${target}/${id}`
      )
  }

  titlePrefix: string = this.route.snapshot.params.target;
}
