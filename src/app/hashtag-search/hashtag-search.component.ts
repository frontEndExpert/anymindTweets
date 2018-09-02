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
export class HashtagSearchComponent implements OnInit {
 // tweetsObservableSubscription: Subscription; // subscribe to All Tweets
  // hashtagForm: NgForm;
  // @ViewChild('f') 
  hashtagForm: FormGroup;
  errormsg='';
  allTweets ; // all the tweet form the service. Allow-Cross-Origin did not work
  tweetsWithHashtag; // the filtered Tweets by hashtags
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
  
  async onSubmit(){
    //if(this.tweetsObservableSubscription){ this.tweetsObservableSubscription.unsubscribe();}
    this.hashtagArr = this.hashtagForm.value.hashtag.split(',');
    console.log('hashtagArr',this.hashtagArr);
    this.hashTag4Table = this.returnTwo(this.hashtagArr);
    let hashtagStr = this.hashtagArr[0].substring(1);
    console.log('hashtagStr',hashtagStr);
    // getting the twitts to the first hashtag term
    this.tweetsWithHashtag = await this.hashSearch.getAllTweets(hashtagStr);
    
    console.log('onSubmit ',this.tweetsWithHashtag);
    // filtering the tweets array by ALL the hashtags serch terms
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
  

    bigger50 = (tweet: string) => {
      if(tweet.length > 50){
        return true;
      }
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

}
