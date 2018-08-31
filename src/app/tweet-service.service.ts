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
  allTweets2;
  allTweets = [
    {
      "account": {
        "fullname": "Aurel Woodtli", 
        "href": "/AWoodtli", 
        "id": 935551298988109825
      }, 
      "date": "2:26 AM - 21 Aug 2018", 
      "hashtags": [
        "#java", 
        "#programming", 
        "#coding", 
        "#python", 
        "#sortingalgorithms", 
        "#animation", 
        "#computer", 
        "#interesting", 
        "#insertionsort", 
        "#selectionsort", 
        "#bubblesort", 
        "#shellsort", 
        "#mergesort", 
        "#heapsort", 
        "#quicksort"
      ], 
      "likes": 78, 
      "replies": 3, 
      "retweets": 39, 
      "text": "Very nice animation, showing the speed of the different sorting algorithms. \n\n#java #programming #coding #python #sortingalgorithms #animation #computer #interesting #insertionsort #selectionsort #bubblesort #shellsort #mergesort #heapsort #quicksort pic.twitter.com/5uhT8o36Kb"
    }, 
    {
      "account": {
        "fullname": "Tom Lynch", 
        "href": "/tompiler", 
        "id": 307070295
      }, 
      "date": "9:59 AM - 21 Aug 2018", 
      "hashtags": [
        "#Python"
      ], 
      "likes": 12, 
      "replies": 2, 
      "retweets": 6, 
      "text": "#Python being synchronously clever and stupid pic.twitter.com/TE04lRuzXx"
    }, 
    {
      "account": {
        "fullname": "Susanne Williams", 
        "href": "/susiebear78", 
        "id": 35203434
      }, 
      "date": "5:27 AM - 28 Aug 2018", 
      "hashtags": [
        "#python"
      ], 
      "likes": 112, 
      "replies": 6, 
      "retweets": 16, 
      "text": "For any Monty Python fans, Doune castle is great fun! Used for the filming of the holy grail...many french knight sketches later I\u2019m still laughing  #python pic.twitter.com/Ace4btJyWh"
    }
  ];




  
  constructor(private http: HttpClient) { }


  getAllTweets(): Observable<string> {

    const myObservableTweets = Observable.create((observer: Observer<string>) => {
     
      for(let i=0;i<this.allTweets.length;i++){
        setTimeout(() => {
          observer.next(JSON.stringify(this.allTweets[i]));
          //console.log('this.allTweets[' + i + "]" + JSON.stringify(this.allTweets[i]));
        }, 1000);
      }
  });
      return myObservableTweets ;
      //this.http.get('https://am-twitter-scrape.herokuapp.com/hashtags/Python?pages_limit=3&wait=0'    );
         // .subscribe((data) => this.allTweets2=data); 
      //console.log('this.allTweets2',this.allTweets2);
    //
    // let tweet = {date: }
    // const DATE_FORMAT = 'MMM d, y';
    // let theDate = {this.allTweets[0].date | date:'MMM d, y'}
    // let date = .format(DATE_FORMAT)

   // return [...this.allTweets];
  }
 

}
