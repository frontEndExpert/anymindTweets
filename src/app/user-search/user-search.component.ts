import { async } from '@angular/core/testing';
import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {TweetObj,TweetServiceService} from '../tweet-service.service';
import {MyValidators} from '../shared/myValidators';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit,OnDestroy {

  twittsObservableSubscription: Subscription; // subscribe to All Twitts
  
  userForm: FormGroup;
  errormsg='';
  //allUserTwitts = []; // all the twitt form the service. Allow-Cross-Origin did not work
  twittsWithUser; // the filtered Twitts by users
  currentPage = 1; // for pager and pagination
  totalItems = 9; // for pager and pagination
  maxSize = 5; // for pager

  maxPage = 10;


  constructor(private userSearch: TweetServiceService) { }
  
  ngOnInit() {
    // building the form
    this.userForm = new FormGroup({
      "user": new FormControl(null, [
                              Validators.required,
                              MyValidators.validateCharacters
      ])
    });
    
    // subscribing to the twitts
    
  //  this.allUserTwitts =  this.hashSearch.getAllTweets(hashtagStr);
    // .subscribe(
    //   (data) => {
    //     this.allUserTwitts.push(JSON.parse(data));
    //     this.totalItems = this.allUserTwitts.length;
    //    // console.log('this.allUserTwitts.length',this.allUserTwitts.length);
    //   },
    //   (error: string) => { console.log(error); },
    //   () => { console.log('completed in sub this.allUserTwitts.length',this.allUserTwitts.length); }
    // );

   // this.twittsWithUser = [...this.allUserTwitts]; 
  }
  
  async onSubmit(){
    this.twittsWithUser = await this.userSearch.getTweetsByUser(this.userForm.value.user);
    this.totalItems = this.twittsWithUser.length;
    console.log('this.twittsWithUser',this.twittsWithUser);
  }


  
  returnTwo = (myArray: string[]) => {
    let hashString ='';
    if(myArray){
    if(myArray.length>=2){
      hashString = myArray[0] + ", " + myArray[1]
    }else{
      hashString = myArray[0]
    }
  }
    return hashString;
  }



  ngOnDestroy() {
    this.twittsObservableSubscription.unsubscribe();
  }

}
