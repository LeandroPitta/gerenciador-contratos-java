import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumeros9]'
})
export class Numeros9Directive {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const initialValue = this.el.nativeElement.value;
    const sanitizedValue = initialValue.replace(/[^0-9]/g, '').slice(0, 9);
    this.el.nativeElement.value = sanitizedValue;
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
