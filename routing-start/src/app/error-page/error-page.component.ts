import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.errorMessage = this.route.snapshot.data['message'];

    // внизу вариант если дата будет меняться подписка на дату,
    // сверху тоже рабочий вариант
    this.route.data.subscribe(
      (data: Date) => {
        this.errorMessage = data['message'];
      }
    )
  }

}
