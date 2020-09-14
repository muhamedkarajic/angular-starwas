import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Search } from "../models/search.model";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { map } from "rxjs/internal/operators/map";
import { BehaviorSubject } from "rxjs";
import { skip } from "rxjs/internal/operators/skip";

@Injectable({
  providedIn: "root",
})
export class ObjectService {
  target$: BehaviorSubject<string> = new BehaviorSubject(null);
  keyword$: BehaviorSubject<string> = new BehaviorSubject(null);
  url$: BehaviorSubject<string> = new BehaviorSubject(null);


  constructor(
    private httpClient: HttpClient,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {
    this.activeRouter.queryParams.pipe(skip(1)).subscribe((data) => {
      this.target$.next(this.setTarget(data));
      data.keyword?this.keyword$.next(data.keyword):null;
      this.url$.next(data.url ? data.url.replace('http', 'https') : null);
    });
  }

  setTarget(data) {
    if (data.target) return data.target;
    else if (data.url) return this.getTitlePrefix(data.url);
    return null;
  }

  validateTarget(target: string): void {
    if (!target)
      this.router.navigate(["/"], {
        queryParams: { target: "films" },
        queryParamsHandling: "merge",
      });
  }

  ignoreKeys: string[] = [
    "opening_crawl",
    "url",
    "edited",
    "created",
    "episode_id",
    "title",
    "homeworld",
  ];

  getTitlePrefix(url) {
    return url.substring(21, url.slice(0, url.length - 1).lastIndexOf("/"));
  }

  isValid(item: any) {
    return (
      !this.ignoreKeys.includes(item.key) &&
      item.value != "unknown" &&
      item.value != "n/a"
    );
  }

  isArray(value: any) {
    return typeof value == "object" && value != null;
  }

  printKey(key: any) {
    return key.replace(/_+/g, " ");
  }
}
