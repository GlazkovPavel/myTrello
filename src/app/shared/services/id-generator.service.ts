import {Injectable} from "@angular/core";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService{

  onId(){
    return of(String( Math.floor(Date.now()/ 100)))
  }

}
