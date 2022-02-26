import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {IUserInfoInterface} from "../../interface/user-info.interface";

@Directive({
  selector: '[clickMouseOver]'
})
export class MouseoverDirective {

  constructor(private _elementRef: ElementRef) {
  }

  @Output()
  public clickMouseOver = new EventEmitter<boolean>();
  public userCard = new EventEmitter<IUserInfoInterface>();


  @HostListener('document:mouseover', ['$event', '$event.target'])
  public onMouseOver(event: MouseEvent, targetElement: HTMLElement, item: IUserInfoInterface): void {

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (clickedInside) {
      this.clickMouseOver.emit(true);
      this.userCard.emit(item);
    }
  }

  @HostListener('document:mouseout', ['$event', '$event.target'])
  public onMouseOut(event: MouseEvent, targetElement: HTMLElement): void {

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (clickedInside) {
      this.clickMouseOver.emit(false);
    }
  }

}
