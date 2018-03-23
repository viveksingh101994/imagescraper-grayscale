import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { HistoryComponent } from './components/history/history.component';
import {routing} from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchresultComponent,
    HistoryComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
