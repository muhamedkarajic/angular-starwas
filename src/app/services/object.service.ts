import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ObjectService {
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

  isArray(item: any) {
    return typeof item.value == "object" && item.value != null;
  }

  printKey(key: any) {
    return key.replace(/_+/g, " ");
  }
}
