import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {IJournalInterface} from "../../interface/journal.interface";
import * as moment from "moment";
import {ITaskInterface} from "../../interface/task.interface";

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  static url = 'http://localhost:3000'

  constructor( private http: HttpClient ) {}

  load(date: moment.Moment): Observable<IJournalInterface>{
    const jwt: string = localStorage.getItem('jwt');
    return this.http
      .get<IJournalInterface>(`${JournalService.url}/journal/${date.format('DD-MM-YYYY')}`, {
        headers: {
          authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .pipe(map(res => {
        if (res) {
          return res;
        }
        return null;
      }))
  }

  create(item: IJournalInterface): Observable<IJournalInterface>{
    const jwt: string = localStorage.getItem('jwt');
    return this.http.post<any>(`${JournalService.url}/journal`, item, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
      .pipe(map((res) => {
        return {...item, id: res.name}
      }))
  }

}
