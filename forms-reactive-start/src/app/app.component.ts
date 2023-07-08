import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmail),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value)
    //   }
    // )
    this.signupForm.statusChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );
    this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com',
      },
      'gender': 'male',
      'hobbies': [],
    })
    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna',
      }
    })
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset()
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onAddHobby() {
    const control = new FormControl(null);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }


  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) >= 0) {
      return {nameIsForbidden: true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
