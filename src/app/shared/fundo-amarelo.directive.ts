import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'p[FundoAmarelo]',
})
export class FundoAmareloDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // console.log(elementRef);
    // elementRef.nativeElement.style.backgroundColor = 'yellow';
    renderer.setStyle(elementRef.nativeElement, 'background-color', 'yellow');
  }
}
