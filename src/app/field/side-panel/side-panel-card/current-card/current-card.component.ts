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
  @Output() public handleShowSpace: EventEmitter<string> = new EventEmitter<string>()
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

  showSpace(id: string) {
    this.handleShowSpace.emit(id);
    if (this.fieldComponent.currentSpace._id === id) {
      this.activeSpace = true;
      return;
    } else {
      this.activeSpace = false;
      return;
    }
  }

}
