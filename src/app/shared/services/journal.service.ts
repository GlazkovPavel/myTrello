import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {IJournalInterface} from "../../interface/journal.interface";
import * as moment from "moment";
import {ITaskInterface} from "../../interface/task.interface";

@Injectable({
  providedIn: 'root'
})
export class JournalService {
  static url = 'https://gretto-597d2-default-rtdb.firebaseio.com/journal'

  constructor(private http: HttpClient ) {}

  create(item: IJournalInterface): Observable<IJournalInterface>{
    return this.http.post<any>(`${JournalService.url}/${item.date}.json`, item)
      .pipe(map((res) => {
        return {...item, id: res.name}
      }))
  }

  load(date: moment.Moment): Observable<IJournalInterface[]> {
    return this.http
      .get<IJournalInterface>(`${JournalService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(item => {
        if (!item) {
          return [];
        }
        // @ts-ignore
        return Object.keys(item).map(key => ({...item[key], id: key}))
      }))
  }

}
