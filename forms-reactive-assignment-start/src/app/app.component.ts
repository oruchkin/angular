import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenProjects = ['test', 'TEST', 'Test'];


  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenProjectsValidator.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsAsync),
      'status': new FormControl('critical'),
    });
  }


  formOnSubmit() {
    console.log('submitted');
    console.log(this.projectForm);
    console.log('projectName: ' + this.projectForm.value.projectName);
    console.log('email: ' + this.projectForm.value.email);
    console.log('status: ' + this.projectForm.value.status);
  }

  forbiddenProjectsValidator(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjects.indexOf(control.value) >= 0) {
      return {projectIsForbidden: true};
    }
    return null;
  }


  forbiddenEmailsAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'oleg@oleg.oleg') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
