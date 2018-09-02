import { FormControl, Validators } from '@angular/forms';

// setup simple regex for white listed characters
// "/[^\s\w,.:&\/()+%'`@-]/";
const validCharacters = "[^()\/\]\[\&\\\x22;|\*\(\)\>\<]+"
// create your class that extends the angular validator class
export class MyValidators extends Validators {
  
  // create a static method for your validation
  static validateCharacters(control: FormControl): {[s: string]: boolean}  {
     
    // first check if the control has a value
    if (control.value && control.value.length > 0) {
     
      // match the control value against the regular expression
      const matches = control.value.match(validCharacters);
      
      // if there are matches return an object, else return null.  invalid_characters: matches
      return matches && matches.length ? { 'ForbiddenCharUse': true } : null;
    } else {
      return null;
    }
  }

  static hashTagStarts(control: FormControl): {[s: string]: boolean} {
    if(control.value && control.value.length > 0){
        let hashtagArr= control.value.split(',');
        let hBoolean = 1;
        hashtagArr.forEach(hashtag => {
            if(hashtag.startsWith('#')){
                    hBoolean *= 1;
                }else{ hBoolean *= 0;}
        });
        if(!hBoolean){
          return {'NotStartsWithHash': true };
        }
    }
  
    return null;
  }
}