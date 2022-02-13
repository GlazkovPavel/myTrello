import {Component, DoCheck, OnInit} from '@angular/core';
import {fromEvent, Observable, of} from "rxjs";
import {arrayUsers} from "../../shared/utils/data";
import {IUserInterfaceBoardHeader} from "../interface/user.interface";
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from "rxjs/operators";
import {UsersService} from "../../shared/services/users.service";
import {IUserInfoInterfaceResponse} from "../../interface/user-info.interface";

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {

  public users$!: Observable<IUserInterfaceBoardHeader[] | null>;
  public user!: Observable<IUserInterfaceBoardHeader>;
  public mask!: IUserInterfaceBoardHeader;
  public inputShow: boolean = true;
  public searchText: Observable<string>;
  search: any;



  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = of(arrayUsers);


  }


  searchUser($event: Event) {
    this.searchText = of(($event.target as HTMLInputElement).value)
    this.searchText.pipe(
      filter(text => text.length > 2),
      debounceTime(150),
      distinctUntilChanged(),
      switchMap( users => this.usersService.searchUser(users)
      )
    ).subscribe()
  }

}
