import { ObjectService } from "src/app/services/object.service";
import { Search } from "src/app/models/search.model";
import { environment } from "src/environments/environment";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "object-cards",
  templateUrl: "./object-cards.component.html",
  styleUrls: ["./object-cards.component.scss"],
})
export class ObjectCardsComponent implements OnInit {
  objects$: Observable<any[]>;
  target: string = this.activeRouter.snapshot.params.target;
  keyword: string = null;

  constructor(
    private httpClient: HttpClient,
    private activeRouter: ActivatedRoute,
    public objectService: ObjectService
  ) {

  }
  ngOnInit(): void {
    this.objectService.keyword$.subscribe((keyword) => {
      this.keyword = keyword;
      this.objects$ = this.fetchObject(this.target, keyword);
    });

  }

  fetchObject(target: string, keyword: string) {
    return this.httpClient
      .get<Search<any>>(
        environment.baseUrl + `${target}?search=${keyword || ""}`
      )
      .pipe(map((data) => data.results
        .map(result => ({
          ...result, id: result.url ? this.objectService.getId(result.url) : undefined
        }))
      ));
  }
}
