import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class ObjectService {

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,

  )
  {

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
