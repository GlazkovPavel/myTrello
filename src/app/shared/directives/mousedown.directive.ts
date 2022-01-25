import {
  Directive,
  HostListener, Renderer2, ElementRef,
} from '@angular/core'

@Directive({
  selector: '[appMousedown]'
})
export class MousedownDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    this.renderer.setStyle(
      this.element.nativeElement,
      'cursor',
      'grab'
    )
  }

  @HostListener('mousedown') onMouseDown() {
    this.setMouseEvent('grabbing');
    this.setTransform('rotate(-10deg)');
  }

  @HostListener('mouseup') onMouseUp() {
    this.setMouseEvent('grab');
    this.setTransform('rotate(0)');
  }

  @HostListener('mouseleave') mouseleave() {
    this.setMouseEvent('grab');
    this.setTransform('rotate(0)');

  }

  private setMouseEvent(val: string) {
    this.renderer.setStyle(
      this.element.nativeElement,
      'cursor',
      val
    )
  };

  private setTransform(val: string) {
    this.renderer.setStyle(
      this.element.nativeElement,
      'transform',
      val,
    )
  }
}

