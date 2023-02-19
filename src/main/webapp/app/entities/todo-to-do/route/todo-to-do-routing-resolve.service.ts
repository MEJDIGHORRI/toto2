import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITodoToDo, TodoToDo } from '../todo-to-do.model';
import { TodoToDoService } from '../service/todo-to-do.service';

@Injectable({ providedIn: 'root' })
export class TodoToDoRoutingResolveService implements Resolve<ITodoToDo> {
  constructor(protected service: TodoToDoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITodoToDo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((todo: HttpResponse<TodoToDo>) => {
          if (todo.body) {
            return of(todo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TodoToDo());
  }
}
