import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appApenasLetras]'
})
export class ApenasLetrasDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const initialValue = this.el.nativeElement.value;
    
    // Use a expressão regular [\p{L}\s] para permitir letras com acento e espaços
    const sanitizedValue = initialValue.replace(/[^\p{L}\s]/gu, '');
    
    this.el.nativeElement.value = sanitizedValue;
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
