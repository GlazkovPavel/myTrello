import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ITaskInterface} from "../../interface/task.interface";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {IResponseTaskInterface} from "../../interface/responseTask.interface";
import * as moment from "moment";

@Injectable({providedIn: 'root'})
export class TaskService {
  static url = 'http://localhost:3000'

  constructor(private http: HttpClient ) {
  }

  create(task: ITaskInterface): Observable<ITaskInterface>{
    const jwt: string = localStorage.getItem('jwt');

    return this.http.post<IResponseTaskInterface>(`${TaskService.url}/tasks`, task, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
      .pipe(map((res) => {
        return {...task, _id: res._id}
      }))
  }

  load(date: moment.Moment): Observable<ITaskInterface[]> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http
      .get<ITaskInterface[]>(`${TaskService.url}/tasks/${date.format('DD-MM-YYYY')}`, {
        headers: {
          authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .pipe(map(tasks => {
        if (!tasks) {
          return []
        }
        return tasks
      }))
  }

  remove(task: ITaskInterface): Observable<void> {
    const jwt: string = localStorage.getItem('jwt');

    return this.http.delete<void>(`${TaskService.url}/tasks/${task._id}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }

}
