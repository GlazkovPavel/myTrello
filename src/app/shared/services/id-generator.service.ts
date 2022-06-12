import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService{

  public onId(): Observable<string> {
    return of(String( Math.floor(Date.now()/ 100)))
  }

}
