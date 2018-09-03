import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HashtagSearchComponent } from './hashtag-search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule ,PaginationModule} from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Response, Http  } from '@angular/http';

describe('HashtagSearchComponent', () => {
  let component: HashtagSearchComponent;
  let fixture: ComponentFixture<HashtagSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[TabsModule ,
        PaginationModule,
        NgxPaginationModule,
        FormsModule, 
        ReactiveFormsModule,HttpModule],
      declarations: [ HashtagSearchComponent ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagSearchComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the comp', async(() => {
    let fixture = TestBed.createComponent(HashtagSearchComponent);
    let comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));

  it('should only returnTwo', async(() => {
    let fixture = TestBed.createComponent(HashtagSearchComponent);
    let comp = fixture.debugElement.componentInstance;
    expect(comp.returnTwo(['A','B','C'])).toBe("A, B");
  }));

});
