import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mat';

  dateChaged(event: any){
    console.log(event)
    console.log(event.target.value)
  }
}
