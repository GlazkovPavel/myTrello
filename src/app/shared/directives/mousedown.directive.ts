import {
  Directive,
  HostListener, HostBinding,
} from '@angular/core'

@Directive({
  selector: '[appMousedown]'
})
export class BoldDirective {

  private fontWeight = 'grab'

  @HostBinding('style.cursor') get getFontWeight() {
    return this.fontWeight
  }

  @HostListener('mousedown') onMouseEnter() {
    this.fontWeight = 'grabbing'
  }

  @HostListener('mouseup') onMouseLeave() {
    this.fontWeight = 'grab'
  }
}

