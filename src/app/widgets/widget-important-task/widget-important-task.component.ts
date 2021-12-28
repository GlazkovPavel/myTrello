import { Component, OnInit } from '@angular/core';
import {FieldComponent} from "../../field/field.component";

@Component({
  selector: 'app-widget-important-task',
  templateUrl: './widget-important-task.component.html',
  styleUrls: ['./widget-important-task.component.scss',
  '../widgets-task-today/widgets-task-today.component.scss']
})
export class WidgetImportantTaskComponent implements OnInit {
  tasks: any;

  constructor(private FieldComponent: FieldComponent) { }

  ngOnInit(): void {
    const vard = this.FieldComponent.spaces
    console.log(vard)
  }

}
