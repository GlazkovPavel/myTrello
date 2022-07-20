export interface ITodoInterface {
  titleTodo: string,
  isCompleted?: boolean,
  _id?: string
}

export interface IListTodoInterface {
  _id: string,
  titleList: string,
  list: ITodoInterface[],
}
