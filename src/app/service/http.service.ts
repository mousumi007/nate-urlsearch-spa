import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
//Seperate class for Http service
export class HttpService {
  constructor(private http: HttpClient) {}

  //function to make http post requests
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
