import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HashtagSearchComponent } from './hashtag-search/hashtag-search.component';
import { UserSearchComponent } from './user-search/user-search.component';

import { TabsModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HashtagSearchComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
