import {Component, Injectable, OnInit} from '@angular/core';
import {IListInterface} from "../interface/list.interface";
import {ISpaceInterface} from "../interface/space.interface";
import {WorkSpaceService} from "../shared/services/work-space.service";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class FieldComponent implements OnInit {

  public spaces: ISpaceInterface[] = [];
  public currentSpace: ISpaceInterface;
  private idSpace: string;

  constructor(private readonly workSpaceService: WorkSpaceService) { }

  ngOnInit(): void {

    this.workSpaceService.getWorkSave().pipe(
      tap((value: ISpaceInterface[]) => {
        this.spaces = value;
        this.currentSpace = this.spaces[0];
      } )
      ).subscribe();
  }

  onAddList($event: IListInterface) {
     this.spaces.find(item => item._id === this.idSpace).list.push($event)
    this.spacesAdd();
  }

  handleDeleteList($eventId: string | undefined) {
    this.currentSpace.list = this.currentSpace.list.filter(item => item._id !== $eventId);
    this.spacesAdd();
  }

  handleSpaceItem($event: ISpaceInterface) {
    this.spaces.push($event)
    this.spacesAdd();
  }

  spaceShow(id: string) {
    this.idSpace = '';
    this.currentSpace = this.spaces.find(item => item._id === id);
    this.idSpace = id;
    this.spacesAdd();
  }

  spacesAdd() {
    const space: ISpaceInterface = {
      _id: this.currentSpace._id,
      title: this.currentSpace.title,
      list: this.currentSpace.list
    }

    this.workSpaceService.saveWorkSpace(space);
  }

}
