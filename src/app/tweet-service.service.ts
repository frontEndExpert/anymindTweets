import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { HttpModule, Response, Http  } from '@angular/http';

import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map, } from 'rxjs/operators';
import * as toPromise from 'rxjs/add/operator/toPromise';

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
  apiRoot:'https://am-twitter-scrape.herokuapp.com';
  results: TweetObj[];
  loading: boolean;
  allTweets;
  allUserTweets;

  constructor(private http:Http) { }


  getAllTweets(hashtag:string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `https://am-twitter-scrape.herokuapp.com/hashtags/${hashtag}?pages_limit=10&wait=0`;
      console.log('apiURL',apiURL);
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            console.log('res.json()', res.json());
            this.results = res.json();
            resolve(this.results);
          },
          msg => { // Error
            reject(msg);
            }
        );
    });
    //console.log('promise',promise);
    return promise;
  }

  getTweetsByUser(userName:string){
    let promise = new Promise((resolve, reject) => {
      let apiURL = `https://am-twitter-scrape.herokuapp.com/users/${userName}?pages_limit=10&wait=0`;
    //  console.log('apiURL',apiURL);
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            //console.log('res.json()', res.json());
            this.results = res.json();
            resolve(this.results);
          },
          msg => { // Error
            reject(msg);
            }
        );
    });
    // console.log('promise',promise);
    return promise;
  }

 
}
