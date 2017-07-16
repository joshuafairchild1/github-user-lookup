import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { GithubService } from './github.service';
import { SearchUsersComponent } from './search-users/search-users.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchUsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
