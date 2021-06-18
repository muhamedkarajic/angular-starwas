import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, UrlTree } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { skip } from 'rxjs/internal/operators/skip';

@Injectable({
  providedIn: "root",
})
export class ObjectService {
  keyword$: BehaviorSubject<string> = new BehaviorSubject(null);
  url$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private activeRouter: ActivatedRoute, private router: Router) {
    this.activeRouter.queryParams.pipe(skip(1)).subscribe((data) => {
      this.url$.next(data.url);
      this.keyword$.next(data.keyword);
    });
  }

  prepareTarget(data: any): string {
    if (data.target) return data.target;
    else if (data.url) return this.getTitlePrefix(data.url);
    this.redirect();
    return null;
  }

  redirect(): void {
    this.router.navigate(["/"], {
      queryParams: { target: "films" },
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

  getTitlePrefix(url: string): string {
    return url.substring(22, url.slice(0, url.length - 1).lastIndexOf("/"));
  }

  getId(url: string): string {
    let urlSplitted = url.split('/');
    return urlSplitted[urlSplitted.length - 2];
  }

  isValid(item: any): boolean {
    return (
      !this.ignoreKeys.includes(item.key) &&
      item.value != "unknown" &&
      item.value != "n/a"
    );
  }

  isArray(value: any): boolean {
    return typeof value == "object" && value != null;
  }
  
  printKey(key: any): string {
    return key.replace(/_+/g, " ");
  }
}
