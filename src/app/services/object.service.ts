import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { skip } from 'rxjs/internal/operators/skip';

@Injectable({
  providedIn: "root",
})
export class ObjectService {
  target$: BehaviorSubject<string> = new BehaviorSubject(null);
  keyword$: BehaviorSubject<string> = new BehaviorSubject(null);
  url$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private activeRouter: ActivatedRoute, private router: Router) {
    this.activeRouter.queryParams.pipe(skip(1)).subscribe((data) => {
      this.url$.next(this.prepareUrl(data.url));
      this.target$.next(this.prepareTarget(data));
      this.keyword$.next(data.keyword);
    });
  }

  prepareUrl(url: string): string {
    return url ? url.replace("http", "https") : null;
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
    return url.substring(21, url.slice(0, url.length - 1).lastIndexOf("/"));
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
