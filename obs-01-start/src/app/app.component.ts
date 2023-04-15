import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSub: Subscription;



  sampleData: number[] = [50, 30, 90, 70, 40, 80, 60, 20, 10, 100];
  numOfBars: number = 5;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe((didActivate) =>{
      this.userActivated = didActivate
    })
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe()
  }
}
