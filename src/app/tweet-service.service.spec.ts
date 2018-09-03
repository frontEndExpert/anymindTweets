import { TestBed, inject } from '@angular/core/testing';

import { TweetServiceService } from './tweet-service.service';
import { HttpModule, Response, Http  } from '@angular/http';

describe('TweetServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule],
      providers: [TweetServiceService]
    });
  });

  it('should be created', inject([TweetServiceService], (service: TweetServiceService) => {
    expect(service).toBeTruthy();
  }));
});
