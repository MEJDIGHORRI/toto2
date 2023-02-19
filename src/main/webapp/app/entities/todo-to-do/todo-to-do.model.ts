export interface ITodoToDo {
  id?: number;
  title?: string;
  state?: string | null;
  description?: string | null;
}

export class TodoToDo implements ITodoToDo {
  constructor(public id?: number, public title?: string, public state?: string | null, public description?: string | null) {}
}

export function getTodoToDoIdentifier(todo: ITodoToDo): number | undefined {
  return todo.id;
}
