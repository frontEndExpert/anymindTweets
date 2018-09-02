import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HashtagSearchComponent } from './hashtag-search/hashtag-search.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Response, Http  } from '@angular/http';

import { NgxPaginationModule, } from 'ngx-pagination';
import { TabsModule ,PaginationModule} from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HashtagSearchComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    NgxPaginationModule,
    HttpClientModule,
    HttpModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
