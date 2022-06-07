import {ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import {UsersService} from "../../shared/services/users.service";
import {IUserInfoInterface} from "../../interface/user-info.interface";
import {ISpaceInterface} from "../../interface/space.interface";

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardHeaderComponent implements OnInit {
  @Output() public deletedWorkspaceOwner: EventEmitter<IUserInfoInterface> = new EventEmitter();
  @Output() public handleAddWorkspaceOwner: EventEmitter<IUserInfoInterface> = new EventEmitter();
  @Input() public currentSpace: ISpaceInterface;
  @Input() public usersWorkSpaceOwner$: Observable<IUserInfoInterface[]>;
  public users$!: Observable<IUserInfoInterface[]>;
  public searchText: Observable<string>;
  public userModalShow:  boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  searchUser($event: Event) {
    this.searchText = of(($event.target as HTMLInputElement).value.trim().toLowerCase())
    this.users$ = this.searchText.pipe(
      filter(text => text.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap( users => this.usersService.searchUser(users))
    )
  }

  onInputShow() {
    this.userModalShow = true;
  }

  addWorkspaceOwner(user: IUserInfoInterface) {
    this.handleAddWorkspaceOwner.emit(user);
    this.userModalShow = false;
    const userOwner = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      _id: user._id
    };
    // this.usersWorkSpaceOwner$.subscribe(
    //   (value: IUserInfoInterface[]) => value.push(userOwner)
    // )
    this.users$ = of(null);

  }

  public clickOutside() {
    this.userModalShow = false;
  }

  deletedOwnerWorkspace($event: IUserInfoInterface) {
    this.deletedWorkspaceOwner.emit($event);
  }
}
