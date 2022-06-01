import {Action} from "../../enum/action";
import {User} from "./user.interface";

export interface Messages {
  from?: User;
  content?: any;
  action?: Action;
}
