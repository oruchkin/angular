import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  Component, ContentChild,
  DoCheck, ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading', {static:true}) header: ElementRef ;
  @ContentChild('contentParagraph', {static:true}) paragraph: ElementRef;
  constructor() {
    console.log('construcor called');
  }

  ngOnChanges(changes:SimpleChanges){
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('text content' + this.header.nativeElement.textContent)
    console.log('text content of paragraph' + this.paragraph.nativeElement.textContent)
    console.log('ngOnInit called');
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
    console.log('text content of paragraph' + this.paragraph.nativeElement.textContent)
  }

  ngAfterViewInit() {
    console.log('AfterViewInit called');
    console.log('text content' + this.header.nativeElement.textContent)
  }

  ngAfterViewChecked() {
    console.log('AfterViewChecked called');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
  }
}
