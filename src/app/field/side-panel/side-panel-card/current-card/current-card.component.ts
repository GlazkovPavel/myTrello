import {
  AfterContentChecked,
  Component, DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ISpaceInterface} from "../../../../interface/space.interface";
import {FieldComponent} from "../../../field.component";

@Component({
  selector: 'app-current-card',
  templateUrl: './current-card.component.html',
  styleUrls: ['../side-panel-card.component.scss'],
})
export class CurrentCardComponent implements DoCheck {
  @Output() public handleShowSpace: EventEmitter<ISpaceInterface> = new EventEmitter<ISpaceInterface>()
  @Output() public handleSpaceId: EventEmitter<string> = new EventEmitter<string>()
  @Input() public activeSpace: boolean = false;
  @Input() public space: ISpaceInterface;

  constructor(private readonly fieldComponent: FieldComponent) { }

  // ngOnInit(): void {
  //   if (this.space._id === this.fieldComponent.currentSpace._id) {
  //     this.activeSpace = true;
  //     return;
  //   }
  //   this.activeSpace = false;
  // }

  ngDoCheck(): void {
    if (this.space._id === this.fieldComponent?.currentSpace?._id) {
      this.activeSpace = true;
      return;
    }
    this.activeSpace = false;
  }

  onDeleteSpace(space: ISpaceInterface) {
    this.handleSpaceId.emit(space._id)
  }

  showSpace(spase: ISpaceInterface) {
    this.handleShowSpace.emit(spase);
    if (this.fieldComponent.currentSpace._id === spase._id) {
      this.activeSpace = true;
      return;
    } else {
      this.activeSpace = false;
      return;
    }
  }

}
