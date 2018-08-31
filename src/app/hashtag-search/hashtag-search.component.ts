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
  hashtagArr4print='';

  currentPage = 1;
  totalItems = 9;
  maxSize = 5;

  maxPage = 2;


  constructor(private hashSearch: TweetServiceService) { }

  onSubmit(form: NgForm){
    this.errormsg='';
  
    this.totalItems = this.allTweets.length;
    console.log('this.allTweets[0]',this.allTweets[0]);
    
    console.log('this.allTweets[0].hashtags',this.allTweets[0].hashtags);

   // console.log('comp this.allTweets',JSON.stringify(this.allTweets));
   this.tweetsWithHashtag = [...this.allTweets];

   //console.log('form.value.hashtag',form.value.hashtag);
   let hashtagArr = this.hashtagForm.value.hashtag.split(' ');
   console.log('hashtagArr',hashtagArr);

  }


  // searchByHashtag(hashtag: string, TweetsArr: any ){

  // }
  
  returnTwo = (myArray: string[]) => {
    let hashString ='';
    if(myArray.length>=2){
      hashString = myArray[0] + " " + myArray[1]
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
