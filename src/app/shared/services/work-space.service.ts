import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ISpaceInterface} from "../../interface/space.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {
  private isUrl: string = 'http://localhost:3000'

  constructor( private http: HttpClient ) {}

  public saveWorkSpace(currentSpace: ISpaceInterface) {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.post<ISpaceInterface>(`${this.isUrl}/work-space`, currentSpace, {
      headers: {
        authorization: `Bearer ${jwt}`,
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

  public updateWorkSpaceOwner(id: string, _id: string): Observable<ISpaceInterface> {
    const body = {
      id: id
    }
    const jwt: string = localStorage.getItem('jwt');
    return this.http.patch<ISpaceInterface>(`${this.isUrl}/work-space/${_id}`, body, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }

  public deleteUserWorkSpace(id: string, _id: string): Observable<ISpaceInterface> {
    const body = {
      id: id
    }
    const jwt: string = localStorage.getItem('jwt');
    return this.http.patch<ISpaceInterface>(`${this.isUrl}/work-space-delete/${_id}`, body, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }

  public deleteWorkSpace(id: string): Observable<void> {
    const jwt: string = localStorage.getItem('jwt');
    return this.http.delete<void>(`${this.isUrl}/work-space/${id}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }


}
