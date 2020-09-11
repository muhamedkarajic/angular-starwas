import { ObjectService } from "src/app/services/object.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Component } from "@angular/core";
import { skip, debounceTime } from "rxjs/operators";
import { FormControl } from "@angular/forms";
@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  currentRoute: string;
  currentParams: any;
  routes$: Observable<[string, string][]>;
  keyword: string = "";
  searchInput: FormControl = new FormControl();

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private objectService: ObjectService
  ) {
    this.routes$ = this.httpClient.get<[string, string][]>(environment.baseUrl);
    this.activeRouter.queryParams
      .pipe(skip(1))
      .subscribe((data) => (this.currentRoute = this.setCurrentModule(data)));
    this.searchInput.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((keyword) => this.changeKeywordQueryParam(keyword));
  }

  setCurrentModule(data) {
    this.currentParams = data;
    if (data.target) return data.target;
    else if (data.url) return this.objectService.getTitlePrefix(data.url);
    return null;
  }

  changeKeywordQueryParam(keyword) {
    const queryParams: Params = { keyword: keyword, target: this.currentRoute };

    this.router.navigate(["/"], {
      queryParams: queryParams,
    });
  }
}
