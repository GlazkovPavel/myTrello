import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-important-task',
  templateUrl: './widget-important-task.component.html',
  styleUrls: ['./widget-important-task.component.scss',
  '../widgets-task-today/widgets-task-today.component.scss']
})
export class WidgetImportantTaskComponent implements OnInit {
  tasks: any;

  constructor() { }

  ngOnInit(): void {
  }

}
