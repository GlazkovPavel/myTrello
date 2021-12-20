import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'momentTime',
  pure: false
})
export class TimePipe implements PipeTransform {
  transform(value: string): string {
    return value
  }
}

