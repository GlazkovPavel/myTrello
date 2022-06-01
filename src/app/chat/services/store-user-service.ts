import { Injectable } from '@angular/core';

@Injectable()
export class StoreUserService {

  constructor() { }


  /**
   * getStoredUser
   */
  public getStoredUser() {
    let storedUser = sessionStorage.getItem("userName");
    return storedUser ? storedUser : "";
  }

  /**
   * storeUser
   */
  public storeUser(userName: string) {
    sessionStorage.setItem("userName", userName);
  }

}
