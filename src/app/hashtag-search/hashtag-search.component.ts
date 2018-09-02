import { async } from '@angular/core/testing';
import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {TweetObj,TweetServiceService} from '../tweet-service.service';
import {MyValidators} from '../shared/myValidators';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-hashtag-search',
  templateUrl: './hashtag-search.component.html',
  styleUrls: ['./hashtag-search.component.css']
})
export class HashtagSearchComponent implements OnInit, OnDestroy {
  tweetsObservableSubscription: Subscription; // subscribe to All Tweets
  // hashtagForm: NgForm;
  // @ViewChild('f') 
  hashtagForm: FormGroup;
  errormsg='';
  allTweets ; // all the tweet form the service. Allow-Cross-Origin did not work
  tweetsWithHashtag = []; // the filtered Tweets by hashtags
  hashtagArr=['']; // the input hashtag to search
  hashTag4Table=''; // the hashtag to display in the table
  currentPage = 1; // for pager and pagination
  totalItems = 9; // for pager and pagination
  maxSize = 5; // for pager

  maxPage = 10;


  constructor(private hashSearch: TweetServiceService) { }
  
  ngOnInit() {
    // building the form
    this.hashtagForm = new FormGroup({
      "hashtag": new FormControl(null, [
                              Validators.required,
                              MyValidators.hashTagStarts,
                              MyValidators.validateCharacters
      ])
    });
    
  }
  
  onSubmit(){
    if(this.tweetsObservableSubscription){ this.tweetsObservableSubscription.unsubscribe();}
    this.allTweets = null;

    this.hashtagArr = this.hashtagForm.value.hashtag.split(',');
    console.log('hashtagArr',this.hashtagArr);
    this.hashTag4Table = this.returnTwo(this.hashtagArr);
    let hashtagStr = this.hashtagArr[0].substring(1);
    console.log('hashtagStr',hashtagStr);
 // subscribing to the tweets
  this.tweetsObservableSubscription = this.hashSearch.getAllTweets(hashtagStr)
 .subscribe(
   (data) => {
     this.allTweets = data;
     this.totalItems = this.allTweets.length;
     
   },
   (error: string) => { console.log(error); },
   () => { console.log('completed in sub this.allTweets.length',this.allTweets.length); }
 );

    waitsFor
    this.tweetsWithHashtag = this.allTweets; // starting with all tweets
    // filtering the tweets array by hashtags recursivly
    console.log('this.allTweets',this.allTweets);
    this.hashtagArr.forEach(hashtag => {
      this.tweetsWithHashtag = this.searchByHashtag(hashtag, this.tweetsWithHashtag)
    });

    this.totalItems = this.tweetsWithHashtag.length;
    console.log('this.tweetsWithHashtag.length',this.tweetsWithHashtag.length);

    // this.hashtagForm.reset();
  }


   searchByHashtag =  (hashtag: string, hashArr ) => {
        let tweetsByHashtag = [];
        tweetsByHashtag = [...hashArr.filter( tweet => 
          tweet.hashtags.filter( hash => hash === hashtag).length>0
        )];

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



  ngOnDestroy() {
    this.tweetsObservableSubscription.unsubscribe();
  }

}
