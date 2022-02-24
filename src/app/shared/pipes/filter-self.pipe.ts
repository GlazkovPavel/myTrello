import { Pipe, PipeTransform } from '@angular/core';
import {IUserInfoInterface} from "../../interface/user-info.interface";

@Pipe({
  name: 'filterSelf'
})
export class FilterSelfPipe implements PipeTransform {

  transform(users: IUserInfoInterface[]): IUserInfoInterface[] {
    const userLocal: IUserInfoInterface = JSON.parse(localStorage.getItem('userInfo'));
    return users.filter(item => item._id !== userLocal._id)
  }
}
