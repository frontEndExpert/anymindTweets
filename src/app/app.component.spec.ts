import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HashtagSearchComponent} from './hashtag-search/hashtag-search.component';
import {UserSearchComponent} from './user-search/user-search.component'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxPaginationModule, } from 'ngx-pagination';
import { TabsModule,TabsetConfig ,PaginationModule} from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Response, Http  } from '@angular/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UserSearchComponent,
        HashtagSearchComponent
      ],
      imports:[TabsModule ,PaginationModule,NgxPaginationModule,
        FormsModule, ReactiveFormsModule,HttpModule],
      providers:[ TabsetConfig ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render title in a h4 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Angular Tweeter');
  }));
});
