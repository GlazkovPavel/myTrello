import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {TaskService} from "../../shared/services/task.service";
import {Observable} from "rxjs";
import {ITaskInterface} from "../../interface/task.interface";
import {DateService} from "../../shared/services/date.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-widgets-task-today',
  templateUrl: './widgets-task-today.component.html',
  styleUrls: ['./widgets-task-today.component.scss']
})
export class WidgetsTaskTodayComponent implements OnInit {

  tasks: ITaskInterface[] = [];

  constructor(
    public dateService: DateService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

  }

}
