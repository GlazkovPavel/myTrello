import {MessageEnum} from "../enum/message.enum";
import {IMessageInterface} from "../interfaces/message.interface";


export const  dialogMessage: Map<MessageEnum, IMessageInterface> = new Map( [

  [
    MessageEnum.MESSAGE_10,
    {
      code: 'MESSAGE_10',
      message: 'Вы действительно хотите выйти из данного рабочего пространства?'
    }
  ],
  [
    MessageEnum.MESSAGE_11,
    {
      code: 'MESSAGE_11',
      message: 'Вы действительно хотите удалить данное рабочее пространство?'
    }
  ],
])
