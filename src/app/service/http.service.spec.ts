import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "./http.service";

describe("HttpService", () => {
  let httpService: HttpService;
  const baseUrl: string = "http://localhost:3000/count-word/";

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpService]
    });
    httpService = TestBed.get(HttpService);
  });

  it("should be created", () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });

  it("should be able to retrieve word occurrences from the word count API bia POST", async () => {
    const postBody = {
      url: "https://norvig.com/big.txt",
      orderBy: "key"
    };
    const response = await httpService.postToApi(baseUrl, postBody);
    console.log(typeof response);
    expect(response).toBeDefined();
    expect(typeof response).toEqual("object");
    expect(response.orderedResponse.length).toBeGreaterThan(0);
    expect(response.orderedResponse).toBeTruthy();
  });
});
