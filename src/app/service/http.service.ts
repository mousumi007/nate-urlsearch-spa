import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  async postToApi(baseUrl: string, requestBody: any) {
    try {
      const response: any = await this.http
        .post(baseUrl, requestBody)
        .toPromise();
      return response;
    } catch (error) {
      const errorMessage = error.status + " " + error.statusText;
      throw errorMessage;
    }
  }
}
