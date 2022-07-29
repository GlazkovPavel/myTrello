import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {IUserInfoInterface} from "../../../interface/user-info.interface";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Output() public deletedWorkspaceOwner: EventEmitter<IUserInfoInterface> = new EventEmitter();
  @Input() public userData: IUserInfoInterface;
  @Input() public showUserCard: boolean;
  @Input() public showButtonDelete: boolean = true;

  public firstLetter!: string;

  public ngOnInit(): void {
    const initials = {
      name: this.userData?.name,
      surname: this.userData?.surname,
      get firstLetter() {
        if(this.surname) {
          return `${this.name[0]} ${this.surname[0]}`
        }
        else if (this.name){
          return `${this.name[0]}`
        } else {
          return null;
        }
      }
    }
    this.firstLetter = initials.firstLetter
  }

  public clickMouseOver($event: boolean): void {
    this.showUserCard = $event;
  }

  public delete(user: IUserInfoInterface): void {
    this.deletedWorkspaceOwner.emit(user);
  }
}
