import {Component, DoCheck, Injectable, OnInit} from '@angular/core';
import {IListInterface} from "../interface/list.interface";
import {ISpaceInterface} from "../interface/space.interface";
import {WorkSpaceService} from "../shared/services/work-space.service";
import {map, switchMap} from "rxjs/operators";
import {UsersService} from "../shared/services/users.service";
import {IUserInfoInterface} from "../interface/user-info.interface";
import {BehaviorSubject, Observable, of} from "rxjs";
import {MessageService} from "../shared/component/message/services/message.service";
import {GetMessageService} from "../shared/component/message/services/get-message.service";
import {MessageEnum} from "../shared/component/message/enum/message.enum";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class FieldComponent implements OnInit {

  public spaces: ISpaceInterface[] = [];
  public currentSpace: ISpaceInterface;
  public usersWorkSpaceOwner$: Observable<IUserInfoInterface[]>;
  public dada: BehaviorSubject<ISpaceInterface[]> = new BehaviorSubject<ISpaceInterface[]>([])
  public lala: Observable<ISpaceInterface[]>;
  private idDeleteSpace: string;
  private idSpace: string;

  constructor(private readonly workSpaceService: WorkSpaceService,
              private readonly usersService: UsersService,
              private readonly errorService: MessageService,
              private readonly getMessageErrorService: GetMessageService) {}

  ngOnInit(): void {
    this.initialization();
  }

  public dadada() {
    this.lala = this.dada.asObservable()
  }

  private initialization() {
    this.workSpaceService.getWorkSave().pipe(
      map((value: ISpaceInterface[]) => {
        this.spaces = value.concat();
        this.dada.next(value);
        this.currentSpace = this.spaces[0];
        return value;
      } ),
      switchMap((value: ISpaceInterface[]) => {
        this.usersWorkSpaceOwner$ = this.usersService.searchUsersWorkSpace(this.currentSpace)
        return of(value);
      })).subscribe()
    this.lala = this.dada.asObservable()
  }

  onAddList($event: IListInterface) {
     this.currentSpace.list.push($event)
    this.spacesAdd();
  }

  handleDeleteList($eventId: string | undefined) {
    this.currentSpace.list = this.currentSpace.list.filter(item => item._id !== $eventId);
    this.spacesAdd();
  }

  handleSpaceItem($event: ISpaceInterface) {
    this.dada.value.push($event);
    this.spaces.push($event);
    this.spacesAdd();
  }

  spaceShow(space: ISpaceInterface) {
    this.searchUsersWorkSpace(space)
    console.log(space.owner)
    this.idSpace = '';
    this.currentSpace = this.spaces.find(item => item._id === space._id);
    this.idSpace = space._id;
    this.spacesAdd();
  }

  private searchUsersWorkSpace(space: ISpaceInterface) {
   this.usersWorkSpaceOwner$ = this.usersService.searchUsersWorkSpace(space)
  }

  public spacesAdd() {
    const space: ISpaceInterface = {
      _id: this.currentSpace?._id,
      title: this.currentSpace?.title,
      list: this.currentSpace?.list,
      holder: this.currentSpace.holder,
      owner: this.currentSpace?.owner.length ? this.currentSpace?.owner : [JSON.parse(localStorage.getItem('userInfo'))._id],
    }
    this.workSpaceService.saveWorkSpace(space);
  }

  public handleDeleteSpaceId(id: string) {
    if(JSON.parse(localStorage.getItem('userInfo'))._id === this.currentSpace?.holder) {
      this.idDeleteSpace = id;
      this.getMessageErrorService.showDialog(MessageEnum.MESSAGE_10, 'handleDeleteSpaceId', id);
    }
    // this.workSpaceService.deleteWorkSpace(id).subscribe(
    //   () => {
    //     this.spaces = this.spaces.filter(item => item._id !== id);
    //   },
    //   error => {
    //     if (error.status === 403) {
    //       this.getMessageErrorService.showError(MessageEnum.MESSAGE_03);
    //     } else {
    //       this.getMessageErrorService.showError(MessageEnum.MESSAGE_01);
    //     }
    //   }
    // )
  }

  public deleteSpaceId(id: string) {
    this.dada.value.filter(item => item._id !== id);
        this.initialization();
      }

  //тут сделать запрос юзеров
  public handleAddWorkspaceOwner($event: IUserInfoInterface) {
    this.currentSpace?.owner.push($event._id);
    this.workSpaceService.updateWorkSpaceOwner($event._id,  this.currentSpace._id)
      .pipe(
        switchMap((data: ISpaceInterface) => {
          return this.usersWorkSpaceOwner$ = this.usersService.searchUsersWorkSpace(data)
        }),

      ).subscribe()
  }

  public handleDeletedWorkspaceOwner($event: IUserInfoInterface) {
    if(JSON.parse(localStorage.getItem('userInfo'))._id === this.currentSpace?.holder) {
      this.workSpaceService.deleteUserWorkSpace($event._id,  this.currentSpace._id)
        .subscribe(
          () => {
            this.currentSpace.owner = this.currentSpace?.owner.filter((val) => val !== $event._id)
            this.usersWorkSpaceOwner$ = this.usersWorkSpaceOwner$.pipe(map((value: IUserInfoInterface[]) => {
              return value.filter((item: IUserInfoInterface) => item._id !== $event._id)
            }))
          })
    } else {
      this.getMessageErrorService.showError(MessageEnum.MESSAGE_02);
    }
  }

}
