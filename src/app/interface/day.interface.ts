import * as moment from "moment";

export interface IDayInterface{
  value: moment.Moment,
  active: boolean,
  disabled: boolean,
  selected: boolean
}
