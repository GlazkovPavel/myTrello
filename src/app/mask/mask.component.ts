import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUserInfoInterface} from "../interface/user-info.interface";

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.css']
})
export class MaskComponent implements OnInit {
  @Output() public deletedOwnerWorkspace: EventEmitter<IUserInfoInterface> = new EventEmitter();
  @Input() mask!: IUserInfoInterface;
  @Input() public showButtonDelete: boolean = true;
  public showUserCard: boolean = false;
  public userData: IUserInfoInterface;
  public firstLetter!: string;

  public ngOnInit(): void {
    const initials = {
      name: this.mask.name,
      surname: this.mask?.surname,
      get firstLetter() {
        if(this.surname) {
          return `${this.name[0]} ${this.surname[0]}`
        }
        else {
          return `${this.name[0]}`
        }
      }
    }
    this.firstLetter = initials.firstLetter
  }

  public clickMouseOver($event: boolean, mask: IUserInfoInterface): void {
    this.showUserCard = $event;
    this.userData = mask;
  }

  public deletedWorkspaceOwner($event: IUserInfoInterface): void {
    this.deletedOwnerWorkspace.emit($event);
  }
}
