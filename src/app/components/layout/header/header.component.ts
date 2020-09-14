import { ObjectService } from "src/app/services/object.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Params, Router } from "@angular/router";
import { Component } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { FormControl } from "@angular/forms";
@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  target: string;
  routes$: Observable<[string, string][]>;
  searchInput: FormControl = new FormControl();

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private objectService: ObjectService
  ) {
    this.objectService.target$.subscribe((target) => {
      this.target = target;
      this.searchInput.setValue(null);

    });
    this.objectService.keyword$.subscribe((keyword) =>
      this.searchInput.setValue(keyword)
    );

    this.searchInput.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((keyword) => this.changeKeywordQueryParam(keyword));
    this.routes$ = this.httpClient.get<[string, string][]>(environment.baseUrl);
  }
  changeKeywordQueryParam(keyword) {
    const queryParams: Params = { keyword: keyword};

    this.router.navigate(["/"], {
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }
}
