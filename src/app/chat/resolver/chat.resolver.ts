import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {ChatService} from "../services/chat.service";
import {ChatMainModel} from "../models/chat-main.model";
import {SpaseChat} from "../interface/space-chat";
import {ISpaceChatResponse} from "../interface/space-chat-response";

@Injectable()
export class ChatResolver implements Resolve<ChatMainModel | null> {
  private isUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private chatService: ChatService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const jwt: string = localStorage.getItem('jwt');

    return this.http.get<any>(`${this.isUrl}/chat`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    }).pipe(
      map((res: ISpaceChatResponse[]) => this.chatService.initModel(res))
    );
  }
}
