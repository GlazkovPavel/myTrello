import {Component, DoCheck, OnInit} from '@angular/core';
import {fromEvent, Observable, of} from "rxjs";
import {arrayUsers} from "../../shared/utils/data";
import {IUserInterfaceBoardHeader} from "../interface/user.interface";
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from "rxjs/operators";
import {UsersService} from "../../shared/services/users.service";
import {IUserInfoInterface, IUserInfoInterfaceResponse} from "../../interface/user-info.interface";

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {

  public users$!: Observable<IUserInfoInterface[]>;
  //public user!: IUserInfoInterfaceResponse;
  //public mask!: IUserInfoInterfaceResponse;
  public inputShow: boolean = false;
  public searchText: Observable<string>;
  search: any;



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
      switchMap( users => this.usersService.searchUser(users)
      )
    )
  }

  onInputShow() {
    this.inputShow = true;
  }
}
