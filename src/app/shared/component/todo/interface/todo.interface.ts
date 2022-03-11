export interface ITodoInterface {
  titleTodo: string,
  isCompleted?: boolean
}

export interface IListTodoInterface {
  _id: string,
  titleList: string,
  list: ITodoInterface[]
}
