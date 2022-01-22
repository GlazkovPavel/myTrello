import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ISpaceInterface} from "../../interface/space.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {
  private isUrl: string = 'http://localhost:3000'
  private jwt: string = localStorage.getItem('jwt');

  constructor( private http: HttpClient ) {}

  public saveWorkSpace(currentSpace: ISpaceInterface) {

    return this.http.post<ISpaceInterface>(`${this.isUrl}/work-space`, currentSpace, {
      headers: {
        authorization: `Bearer ${this.jwt}`,
        'Content-Type': 'application/json'
      }
    })
      .pipe(
        catchError(() => of(null))
      ).subscribe()
  }

  public getWorkSave(): Observable<ISpaceInterface[]> {
  const jwt: string = localStorage.getItem('jwt');
    return this.http.get<ISpaceInterface[]>(`${this.isUrl}/work-space`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
}

  public deleteWorkSpace(id: string): Observable<void> {
    return this.http.delete<void>(`${this.isUrl}/work-space/${id}`, {
      headers: {
        authorization: `Bearer ${this.jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }


}
