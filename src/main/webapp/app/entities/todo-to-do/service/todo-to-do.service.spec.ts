import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITodoToDo, TodoToDo } from '../todo-to-do.model';

import { TodoToDoService } from './todo-to-do.service';

describe('Service Tests', () => {
  describe('TodoToDo Service', () => {
    let service: TodoToDoService;
    let httpMock: HttpTestingController;
    let elemDefault: ITodoToDo;
    let expectedResult: ITodoToDo | ITodoToDo[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TodoToDoService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        title: 'AAAAAAA',
        state: 'AAAAAAA',
        description: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TodoToDo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TodoToDo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TodoToDo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            title: 'BBBBBB',
            state: 'BBBBBB',
            description: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a TodoToDo', () => {
        const patchObject = Object.assign(
          {
            state: 'BBBBBB',
            description: 'BBBBBB',
          },
          new TodoToDo()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TodoToDo', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            title: 'BBBBBB',
            state: 'BBBBBB',
            description: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TodoToDo', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTodoToDoToCollectionIfMissing', () => {
        it('should add a TodoToDo to an empty array', () => {
          const todo: ITodoToDo = { id: 123 };
          expectedResult = service.addTodoToDoToCollectionIfMissing([], todo);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(todo);
        });

        it('should not add a TodoToDo to an array that contains it', () => {
          const todo: ITodoToDo = { id: 123 };
          const todoCollection: ITodoToDo[] = [
            {
              ...todo,
            },
            { id: 456 },
          ];
          expectedResult = service.addTodoToDoToCollectionIfMissing(todoCollection, todo);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TodoToDo to an array that doesn't contain it", () => {
          const todo: ITodoToDo = { id: 123 };
          const todoCollection: ITodoToDo[] = [{ id: 456 }];
          expectedResult = service.addTodoToDoToCollectionIfMissing(todoCollection, todo);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(todo);
        });

        it('should add only unique TodoToDo to an array', () => {
          const todoArray: ITodoToDo[] = [{ id: 123 }, { id: 456 }, { id: 55722 }];
          const todoCollection: ITodoToDo[] = [{ id: 123 }];
          expectedResult = service.addTodoToDoToCollectionIfMissing(todoCollection, ...todoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const todo: ITodoToDo = { id: 123 };
          const todo2: ITodoToDo = { id: 456 };
          expectedResult = service.addTodoToDoToCollectionIfMissing([], todo, todo2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(todo);
          expect(expectedResult).toContain(todo2);
        });

        it('should accept null and undefined values', () => {
          const todo: ITodoToDo = { id: 123 };
          expectedResult = service.addTodoToDoToCollectionIfMissing([], null, todo, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(todo);
        });

        it('should return initial array if no TodoToDo is added', () => {
          const todoCollection: ITodoToDo[] = [{ id: 123 }];
          expectedResult = service.addTodoToDoToCollectionIfMissing(todoCollection, undefined, null);
          expect(expectedResult).toEqual(todoCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
