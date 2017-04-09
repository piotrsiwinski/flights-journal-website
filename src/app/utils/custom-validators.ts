import {FormControl} from "@angular/forms";
/**
 * Created by Piotrek on 09.04.2017.
 */
export class CustomValidators {

  public static emailValidator(control: FormControl): {[key: string]: boolean}{
    let pattern: RegExp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    if(!pattern.test(control.value)){
      return { incorrectEmail: true };
    }
    return null;
  }
}
