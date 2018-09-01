import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {TweetObj,TweetServiceService} from '../tweet-service.service'

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
  forbiddencharacters= ['/', '(', ')','[',']',',',';',':'];
  errormsg='';
  
  allTweets = []; // all the tweet form the service. Allow-Cross-Origin did not work
  tweetsWithHashtag = []; // the filtered Tweets by hashtags
  hashtagArr=['']; // the input hashtag to search
  hashTag4Table=''; // the hashtag to display in the table
  currentPage = 1; // for pager and pagination
  totalItems = 9; // for pager and pagination
  maxSize = 5; // for pager

  maxPage = 10;


  constructor(private hashSearch: TweetServiceService) { }
  
  ngOnInit() {
    this.hashtagForm = new FormGroup({
      hashtag: new FormControl(null, [Validators.required, this.forbiddenChars])
    });


    this.tweetsObservableSubscription = this.hashSearch.getAllTweets()
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
  // validateHashtag (hashTag: string){
  //   if(!hashTag.startsWith('#')){
  //     return {
  //               valid: false,
  //               msgError: "Hashtag should start with # character!"
  //             }
  //   }else if(hashTag.match(/[^()/><\][\\\x22,;|]+/)){
  //     return {
  //       valid: false,
  //       msgError: "Please avoide special characters ^()][\\,;!"
  //     }
  //   }
  // }

  HashTagStarts(control: FormControl): {[s: string]: boolean} {
    if(!control.value.startsWith('#')){
        return {'StartsWithHash': true};
    }
  }


  forbiddenChars(control: FormControl): {[s: string]: boolean} {
    var forbiddenRegex= /[\/\\\(\)\[\]\}\{\&\|\^]./
      if (control.value.match(forbiddenRegex)) {
        //console.log('ForbiddenCharUse=True');
        return {'ForbiddenCharUse': true};
      }
      return null;
  }

  onSubmit(){
    // this.errormsg='';
    

    this.hashtagArr = this.hashtagForm.value.hashtag.split(',');
    console.log('hashtagArr',this.hashtagArr);
    this.hashTag4Table = this.returnTwo(this.hashtagArr);
    let hashtagStr = this.hashtagArr[0];
    this.tweetsWithHashtag = [...this.allTweets]; // starting with all tweets
    // filtering the tweets array by hashtags recursivly
    this.hashtagArr.forEach(hashtag => {
      this.tweetsWithHashtag = this.searchByHashtag(hashtag, this.tweetsWithHashtag)
    });

    this.totalItems = this.tweetsWithHashtag.length;
    console.log('this.tweetsWithHashtag.length',this.tweetsWithHashtag.length);
  }


   searchByHashtag =  (hashtag: string, hashArr ) => {
        let tweetsByHashtag = [];
        tweetsByHashtag = [...hashArr.filter( tweet => tweet.text.includes(hashtag))];

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
