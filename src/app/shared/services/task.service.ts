import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ITaskInterface} from "../../interface/task.interface";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {IResponseTaskInterface} from "../../interface/responseTask.interface";
import * as moment from "moment";

@Injectable({providedIn: 'root'})
export class TaskService {
  static url = 'https://gretto-597d2-default-rtdb.firebaseio.com/task'

  constructor(private http: HttpClient ) {
  }

  create(task: ITaskInterface): Observable<ITaskInterface>{
    return this.http.post<IResponseTaskInterface>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(map((res) => {
        return {...task, id: res.name}
      }))
  }

  load(date: moment.Moment): Observable<ITaskInterface[]> {
    return this.http
      .get<ITaskInterface[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return []
        }
        // @ts-ignore
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}))
      }))
  }

  remove(task: ITaskInterface): Observable<void> {
    return this.http.delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`)
  }

}
