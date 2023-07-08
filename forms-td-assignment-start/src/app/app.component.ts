import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultQuestion = 'advanced';
  submitted = false;
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  @ViewChild('f', {static: false}) myForm: NgForm;
  formData = {
    email: '',
    password: '',
    subscription: '',
  };

  formOnSubmit() {
    console.log('submitted');
    console.log(this.myForm);
    this.submitted = true;
    this.formData.email = this.myForm.value.email;
    this.formData.password = this.myForm.value.password;
    this.formData.subscription = this.myForm.value.subscription;
  }
}
