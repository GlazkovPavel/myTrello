import {
  Directive,
  HostListener, Renderer2, ElementRef,
} from '@angular/core'
import {swipe$} from "../utils/swipe";

@Directive({
  selector: '[appMousedown]'
})
export class MousedownDirective {

  public value: WindowEventHandlers;

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
    swipe$.subscribe((v) => {
      if (v > 0) {
        this.setTransform('rotate(-10deg)');
        return;
      }
      this.setTransform('rotate(10deg)');
    })
  }

  @HostListener('mouseup') onMouseUp() {
    this.setMouseEvent('grab');
  }
  @HostListener('mouseout') mouseOut() {
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

