import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search/search.component";
import { FormsModule } from "@angular/forms";
import { HttpService } from "./service/http.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [AppComponent, SearchComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, NgbModule],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
