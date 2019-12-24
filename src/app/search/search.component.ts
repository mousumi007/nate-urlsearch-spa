import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../service/http.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
//search component to display search results in the search page
export class SearchComponent implements OnInit {
  private baseUrl: string;
  searchUrl: string;
  response: any;
  postData: any;
  searchUrlHistory: Array<string>;
  searchUrlResultHistory: Map<string, Array<object> | string>;
  errorResponse: string;
  isShown: boolean;
  isError: boolean;

  constructor(private httpService: HttpService) {
    this.baseUrl = "http://localhost:3000/count-word";
    this.searchUrlHistory = [];
    this.searchUrlResultHistory = new Map<string, Array<object> | string>();
    this.isShown = false;
    this.isError = false;
    this.errorResponse = "";
    this.searchUrl = "";
  }

  ngOnInit() {}

  //function take search input and call http service to get search results
  async search() {
    try {
      this.isShown = true;
      this.isError = false;
      this.postData = {
        url: this.searchUrl
      };

      const apiResponse: any = await this.httpService.postToApi(
        this.baseUrl,
        this.postData
      );

      this.storeSearchHistory(this.postData.url, apiResponse.orderedResponse);

      this.response = apiResponse.orderedResponse;
    } catch (error) {
      this.storeSearchHistory(this.postData.url, error);
      this.isShown = false;
      this.isError = true;
      this.errorResponse = error;
    }
  }

  //function to store search url's and history
  storeSearchHistory(url: string, apiResponse: any) {
    //store the previous search url's
    if (
      url.length > 0 &&
      this.searchUrlHistory &&
      !this.searchUrlHistory.some(
        q => q === this.postData.url && url.length > 0
      )
    ) {
      this.searchUrlHistory = [...this.searchUrlHistory, url];
      this.searchUrlResultHistory.set(this.postData.url, apiResponse);
    }
  }

  //function to display previous search history
  showBrowsingHistory(url) {
    const tempResponse = this.searchUrlResultHistory.get(url);
    if (typeof tempResponse !== "string") {
      this.isShown = true;
      this.isError = false;
      this.response = tempResponse;
    } else {
      this.isShown = false;
      this.isError = true;
      this.errorResponse = tempResponse;
    }
  }
}
