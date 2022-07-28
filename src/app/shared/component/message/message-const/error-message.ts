import {MessageEnum} from "../enum/message.enum";
import {IMessageInterface} from "../interfaces/message.interface";


export const  errorMessage: Map<MessageEnum, IMessageInterface> = new Map( [
  [
    MessageEnum.MESSAGE_ERROR_01,
    {
      code: 'MESSAGE_ERROR_01',
      message: 'Произошла непредвиденная ошибка'
    }
  ],
  [
    MessageEnum.MESSAGE_ERROR_02,
    {
      code: 'MESSAGE_ERROR_02',
      message: 'Нельзя удалять пользователей если вы не владелец данного рабочего пространства'
    }
  ],
  [
    MessageEnum.MESSAGE_ERROR_03,
    {
      code: 'MESSAGE_ERROR_03',
      message: 'Нет прав, нельзя удалять ресурсы других пользователей'
    }
  ],
  [
    MessageEnum.MESSAGE_ERROR_04,
    {
      code: 'MESSAGE_ERROR_04',
      message: 'Не удалось загрузить список задач'
    }
  ],
  [
    MessageEnum.MESSAGE_ERROR_05,
    {
      code: 'MESSAGE_ERROR_05',
      message: 'Не удалось изменить задачу'
    }
  ],
  [
    MessageEnum.MESSAGE_ERROR_06,
    {
      code: 'MESSAGE_ERROR_06',
      message: 'Не удалось создать лист задач'
    }
  ],
  [
    MessageEnum.MESSAGE_ERROR_07,
    {
      code: 'MESSAGE_ERROR_07',
      message: 'Не удалось создать задачу'
    }
  ],
  [
    MessageEnum.MESSAGE_ERROR_08,
    {
      code: 'MESSAGE_ERROR_08',
      message: 'Не удалось удалить задачу'
    }
  ],
  [
    MessageEnum.MESSAGE_ERROR_09,
    {
      code: 'MESSAGE_ERROR_09',
      message: 'Не удалось удалить лист задач'
    }
  ],

])
