import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-hashtag-search',
  templateUrl: './hashtag-search.component.html',
  styleUrls: ['./hashtag-search.component.css']
})
export class HashtagSearchComponent implements OnInit {
  @ViewChild('f') hashtagForm: NgForm;
  errormsg='';
  tweetsArr=[];
  hashtagArr4print='';
  constructor() { }

  onSubmit(form: NgForm){
    this.errormsg='';
    let hashtagArr = this.hashtagForm.value.hashtag.split(' ')
    console.log("submitted hashtagArr",  hashtagArr);

    this.hashtagArr4print=(hashtagArr.length>=2)?hashtagArr[0]+" " + hashtagArr[1]:hashtagArr[0];

  }



  ngOnInit() {
  }

}
