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

  it('#Pascal should be a valid #hashtag input', async(() => {
    let hashtag = component.hashtagForm.controls['hashtag']; 
    hashtag.setValue("#Pascal");
    expect(hashtag.valid).toBeTruthy(); 
  }));
  it('Pascal should be invalid input', async(() => {
    let hashtag = component.hashtagForm.controls['hashtag']; 
    hashtag.setValue("Pascal");
    expect(hashtag.valid).toBeFalsy(); 
  }));
  it('Pascal should error with NotStartsWithHash', async(() => {
    let hashtag = component.hashtagForm.controls['hashtag']; 
    hashtag.setValue("Pascal");
    let errors = hashtag.errors || {}
    expect(errors['NotStartsWithHash']).toBeTruthy(); 
  }));
  it('hashtag field is invalid first', () => {
    let hashtag = component.hashtagForm.controls['hashtag']; 
    expect(hashtag.valid).toBeFalsy(); 
  });
});
