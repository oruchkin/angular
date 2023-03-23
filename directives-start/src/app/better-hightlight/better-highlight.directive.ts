import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgoundColorZ: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.backgoundColorZ = this.defaultColor
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue', );
  }

  @HostListener('mouseenter') mouseoverZ(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue', );
    this.backgoundColorZ = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleaveZ(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent', );
    this.backgoundColorZ = this.defaultColor;
  }

}
