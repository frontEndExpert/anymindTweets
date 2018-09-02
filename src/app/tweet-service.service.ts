import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse  } from '@angular/common/http';

import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TweetObj {
  "account": {"fullname": string,
            "href": string,
            "id": number },
  "date": string,
  "hashtags": string[],
  "likes": number, 
  "replies": number, 
  "retweets": number, 
  "text": string
}

@Injectable({
  providedIn: 'root'
})
export class TweetServiceService {
  allTweets;
  allUserTweets;

  constructor(private http: HttpClient) { }


  getAllTweets(hashtag: string): Observable<Object> {

  //   const myObservableTweets = Observable.create((observer: Observer<string>) => {
     
  //     for(let i=0;i<this.allTweets.length;i++){
  //       setTimeout(() => {
  //         observer.next(JSON.stringify(this.allTweets[i]));
  //       }, 1000);
  //     }
  // });
    let myUrl="https://am-twitter-scrape.herokuapp.com/hashtags/"+hashtag+"?pages_limit=10&wait=0";
    console.log('myUrl',myUrl);
    const myObservableTweets = this.http.get( myUrl  );
        // .subscribe((data) => this.allTweets2=data); 
        //console.log('this.allTweets2',this.allTweets2);
      return myObservableTweets ;

  }

  getAllUserTweets(): Observable<string> {

    const myUserObservableTweets = Observable.create((observer: Observer<string>) => {
     
      for(let i=0;i<this.allUserTweets.length;i++){
        setTimeout(() => {
          observer.next(JSON.stringify(this.allUserTweets[i]));
        }, 1000);
      }
  });
      return myUserObservableTweets ;

      //const myObservableTweets = this.http.get('https://am-twitter-scrape.herokuapp.com/hashtags/Python?pages_limit=3&wait=0'    );
         // .subscribe((data) => this.allTweets2=data); 
      //console.log('this.allTweets2',this.allTweets2);
  }
 
}
