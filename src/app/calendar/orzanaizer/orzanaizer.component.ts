import { Component, OnInit } from '@angular/core';
import {DateService} from "../../shared/services/date.service";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../shared/services/task.service";
import {ITaskInterface} from "../../interface/task.interface";
import {switchMap} from "rxjs/operators";
import {JournalService} from "../../shared/services/journal.service";

@Component({
  selector: 'app-orzanaizer',
  templateUrl: './orzanaizer.component.html',
  styleUrls: ['./orzanaizer.component.scss', '../calendar.component.scss']
})
export class OrzanaizerComponent implements OnInit {

  public form: UntypedFormGroup;
  public tasks: ITaskInterface[] = [];

  constructor(public dateService: DateService,
              private tasksService: TaskService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new UntypedFormGroup({
      title: new UntypedFormControl('', Validators.required)
    })
  };

  submit() {
    const {title} = this.form.value

    const task: ITaskInterface = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };

    this.tasksService.create(task).subscribe(task => {
      this.tasks.push(task)
      this.form.reset();

    }, error => console.log(error))

  };

  remove(task: ITaskInterface) {
    this.tasksService.remove(task).subscribe(
      () => {
        this.tasks = this.tasks.filter(t => t._id !== task._id)
      },
      error => console.log(error)
    )
  }
}
