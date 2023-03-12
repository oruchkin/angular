import { Component } from '@angular/core';

@Component({
  selector: 'app-assingment3',
  templateUrl: './assingment3.component.html',
  styles: [`
    .whitecolor {
      color: white;
    }
  `]
})
export class Assingment3Component {
  passwordHidden = true;
  number = 0
  buttonLogger = []

  changeVisability() {
    this.passwordHidden = !this.passwordHidden;
    this.number += 1
    // this.buttonLogger.push(this.number)
    console.log(this.buttonLogger)
    this.buttonLogger.push(new Date())

  }
}
