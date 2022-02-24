import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs/operators";
import {UsersService} from "../../shared/services/users.service";
import {IUserInfoInterface} from "../../interface/user-info.interface";
import {ISpaceInterface} from "../../interface/space.interface";

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {

  @Output() public handleAddWorkspaceOwner: EventEmitter<string> = new EventEmitter();
  @Input() public currentSpace: ISpaceInterface;
  @Input() public usersWorkSpaceOwner$: Observable<IUserInfoInterface[]>;
  public users$!: Observable<IUserInfoInterface[]>;
  public usersOwnerWorkSpace: IUserInfoInterface[] = [];
  public searchText: Observable<string>;
  public userModalShow:  boolean = false;
  public showUserCard: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  searchUser($event: Event) {
    this.searchText = of(($event.target as HTMLInputElement).value.toLowerCase())
    this.users$ = this.searchText.pipe(
      filter(text => text.length > 2),
      debounceTime(150),
      distinctUntilChanged(),
      switchMap( users => this.usersService.searchUser(users))
    )
  }

  onInputShow() {
    this.userModalShow = true;
  }

  addWorkspaceOwner(user: IUserInfoInterface) {
    this.handleAddWorkspaceOwner.emit(user._id);
    this.userModalShow = false;
    const userOwner = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      _id: user._id
    }
    this.usersOwnerWorkSpace.push(userOwner);
    this.users$ = of(null)
  }

  public clickOutside() {
    this.userModalShow = false;
  }

  // public showCardUser($event: boolean) {
  //   this.showUserCard = $event;
  // }
}
