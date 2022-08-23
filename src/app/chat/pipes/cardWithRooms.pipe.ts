import {Pipe, PipeTransform} from "@angular/core";
import {ChatMainModel} from "../models/chat-main.model";

@Pipe({
  name: 'CardWithRoomsPipe'
})
export class CardWithRoomsPipe implements PipeTransform {
  transform(value: ChatMainModel[]): ChatMainModel[] {
    return value.filter((chat: ChatMainModel) => chat.getChatMainId() !== '0');
  }
}
