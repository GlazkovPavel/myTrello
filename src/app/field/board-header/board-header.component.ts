import {Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import {fromEvent, Observable, of} from "rxjs";
import {arrayUsers} from "../../shared/utils/data";
import {IUserInterfaceBoardHeader} from "../interface/user.interface";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import {UsersService} from "../../shared/services/users.service";
import {IUserInfoInterface, IUserInfoInterfaceResponse} from "../../interface/user-info.interface";

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {

  @Output() public handleAddWorkspaceOwner: EventEmitter<string> = new EventEmitter();
  public users$!: Observable<IUserInfoInterface[]>;
  public usersOwnerWorkSpace: IUserInfoInterface[] = [];
  //public user!: IUserInfoInterfaceResponse;
  //public mask!: IUserInfoInterfaceResponse;
  public inputShow: boolean = false;
  public searchText: Observable<string>;
  public userModalShow:  boolean = false;
  //search: any;



  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    //this.users$ = of(arrayUsers);
  }

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
}
