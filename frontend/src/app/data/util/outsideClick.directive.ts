import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[openCloseToggle]',
  standalone: true,
})
export class OutsideClickDirective {
  @Input() openOrClose: boolean = false;
  @Output() openCloseToggle = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target) || this.openOrClose) {
      this.openCloseToggle.emit(false);
    } else {
      this.openCloseToggle.emit(true);
    }
  }
}
