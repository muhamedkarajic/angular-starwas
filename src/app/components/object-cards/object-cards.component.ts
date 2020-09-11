import { Router, Params } from "@angular/router";
import { Search } from "src/app/models/search.model";
import { environment } from "src/environments/environment";
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "object-cards",
  templateUrl: "./object-cards.component.html",
  styleUrls: ["./object-cards.component.scss"],
})
export class ObjectCardsComponent {
  objects$: Observable<any[]>;

  constructor(
    private httpClient: HttpClient,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {
    activeRouter.queryParams.subscribe((data) => {
      this.validateTarget(data.target);
      this.objects$ = httpClient
        .get<Search<any>>(environment.baseUrl + `${data.target}/?search=${data.keyword || ""}`)
        .pipe(map((data) => data.results));
    });
  }

  validateTarget(target: string): void {
    if (!target)
      this.router.navigate(["/"], {
        queryParams: { target: "films" },
        queryParamsHandling: "merge",
      });
  }
}
