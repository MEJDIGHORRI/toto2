jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITodoToDo, TodoToDo } from '../todo-to-do.model';
import { TodoToDoService } from '../service/todo-to-do.service';

import { TodoToDoRoutingResolveService } from './todo-to-do-routing-resolve.service';

describe('Service Tests', () => {
  describe('TodoToDo routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TodoToDoRoutingResolveService;
    let service: TodoToDoService;
    let resultTodoToDo: ITodoToDo | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TodoToDoRoutingResolveService);
      service = TestBed.inject(TodoToDoService);
      resultTodoToDo = undefined;
    });

    describe('resolve', () => {
      it('should return ITodoToDo returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTodoToDo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTodoToDo).toEqual({ id: 123 });
      });

      it('should return new ITodoToDo if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTodoToDo = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTodoToDo).toEqual(new TodoToDo());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TodoToDo })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTodoToDo = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTodoToDo).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
