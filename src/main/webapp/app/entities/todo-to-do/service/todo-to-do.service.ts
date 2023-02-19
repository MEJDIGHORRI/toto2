import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITodoToDo, getTodoToDoIdentifier } from '../todo-to-do.model';

export type EntityResponseType = HttpResponse<ITodoToDo>;
export type EntityArrayResponseType = HttpResponse<ITodoToDo[]>;

@Injectable({ providedIn: 'root' })
export class TodoToDoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/todos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(todo: ITodoToDo): Observable<EntityResponseType> {
    return this.http.post<ITodoToDo>(this.resourceUrl, todo, { observe: 'response' });
  }

  update(todo: ITodoToDo): Observable<EntityResponseType> {
    return this.http.put<ITodoToDo>(`${this.resourceUrl}/${getTodoToDoIdentifier(todo) as number}`, todo, { observe: 'response' });
  }

  partialUpdate(todo: ITodoToDo): Observable<EntityResponseType> {
    return this.http.patch<ITodoToDo>(`${this.resourceUrl}/${getTodoToDoIdentifier(todo) as number}`, todo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITodoToDo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITodoToDo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTodoToDoToCollectionIfMissing(todoCollection: ITodoToDo[], ...todosToCheck: (ITodoToDo | null | undefined)[]): ITodoToDo[] {
    const todos: ITodoToDo[] = todosToCheck.filter(isPresent);
    if (todos.length > 0) {
      const todoCollectionIdentifiers = todoCollection.map(todoItem => getTodoToDoIdentifier(todoItem)!);
      const todosToAdd = todos.filter(todoItem => {
        const todoIdentifier = getTodoToDoIdentifier(todoItem);
        if (todoIdentifier == null || todoCollectionIdentifiers.includes(todoIdentifier)) {
          return false;
        }
        todoCollectionIdentifiers.push(todoIdentifier);
        return true;
      });
      return [...todosToAdd, ...todoCollection];
    }
    return todoCollection;
  }
}
