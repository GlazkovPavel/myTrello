export interface ITodoInterface {
  _id: string,
  title: string,
  isCompleted: boolean
}

export interface IListTodoInterface {
  _id: string,
  title: string,
  todoList: ITodoInterface
}
