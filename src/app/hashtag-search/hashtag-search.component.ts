import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import {TweetObj,TweetServiceService} from '../tweet-service.service'

import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-hashtag-search',
  templateUrl: './hashtag-search.component.html',
  styleUrls: ['./hashtag-search.component.css']
})
export class HashtagSearchComponent implements OnInit, OnDestroy {
  customObsSubscription: Subscription;
  @ViewChild('f') hashtagForm: NgForm;
  errormsg='';
  tweetsArr;
  allTweets = [];
  tweetsWithHashtag = [];
  hashtagArr=[''];
  hashTag4Table='';
  currentPage = 1;
  totalItems = 9;
  maxSize = 5;

  maxPage = 10;


  constructor(private hashSearch: TweetServiceService) { }

  onSubmit(form: NgForm){
    this.errormsg='';

    this.hashtagArr = this.hashtagForm.value.hashtag.split(',');
    console.log('hashtagArr',this.hashtagArr);
    this.hashTag4Table = this.returnTwo(this.hashtagArr);
    console.log('this.hashTag4Table',this.hashTag4Table);
    let hashtagStr = this.hashtagArr[0];
    this.tweetsWithHashtag = [...this.allTweets];
    
    this.hashtagArr.forEach(hashtag => {
      this.tweetsWithHashtag = this.searchByHashtag(hashtag, this.tweetsWithHashtag)
    });

    // this.tweetsWithHashtag = this.allTweets.filter(
    //   tweet => JSON.stringify(tweet.hashtags).includes(this.hashtagArr[0] && this.hashtagArr[1]));

    //console.log(' this.tweetsWithHashtag', this.tweetsWithHashtag);this.searchByHashtag(hashtagStr);
    this.totalItems = this.tweetsWithHashtag.length;
    console.log('this.tweetsWithHashtag.length',this.tweetsWithHashtag.length);


  }


   searchByHashtag =  (hashtag: string, hashArr ) => {
        let tweetsByHashtag = [];
        tweetsByHashtag = hashArr.filter(
        tweet => tweet.text.includes(hashtag));
        console.log(hashtag + " - " + tweetsByHashtag);
        return tweetsByHashtag;
    }
  
  returnTwo = (myArray: string[]) => {
    let hashString ='';
    if(myArray.length>=2){
      hashString = myArray[0] + ", " + myArray[1]
    }else{
      hashString = myArray[0]
    }

    return hashString;
  }

  ngOnInit() {
    this.customObsSubscription = this.hashSearch.getAllTweets()
    .subscribe(
      (data) => {
        this.allTweets.push(JSON.parse(data));
        this.totalItems = this.allTweets.length;
       // console.log('this.allTweets.length',this.allTweets.length);
      },
      (error: string) => { console.log(error); },
      () => { console.log('completed in sub this.allTweets.length',this.allTweets.length); }
    );
  }

  ngOnDestroy() {
    this.customObsSubscription.unsubscribe();
  }

}
