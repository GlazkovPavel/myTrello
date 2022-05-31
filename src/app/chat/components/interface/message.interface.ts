import {User} from "../../models/user.model";
import {Action} from "../../enum/action";

export interface Message {
  from?: User;
  content?: any;
  action?: Action;
}
