jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TodoToDoService } from '../service/todo-to-do.service';
import { ITodoToDo, TodoToDo } from '../todo-to-do.model';

import { TodoToDoUpdateComponent } from './todo-to-do-update.component';

describe('Component Tests', () => {
  describe('TodoToDo Management Update Component', () => {
    let comp: TodoToDoUpdateComponent;
    let fixture: ComponentFixture<TodoToDoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let todoService: TodoToDoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TodoToDoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TodoToDoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TodoToDoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      todoService = TestBed.inject(TodoToDoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const todo: ITodoToDo = { id: 456 };

        activatedRoute.data = of({ todo });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(todo));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TodoToDo>>();
        const todo = { id: 123 };
        jest.spyOn(todoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ todo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: todo }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(todoService.update).toHaveBeenCalledWith(todo);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TodoToDo>>();
        const todo = new TodoToDo();
        jest.spyOn(todoService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ todo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: todo }));
        saveSubject.complete();

        // THEN
        expect(todoService.create).toHaveBeenCalledWith(todo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TodoToDo>>();
        const todo = { id: 123 };
        jest.spyOn(todoService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ todo });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(todoService.update).toHaveBeenCalledWith(todo);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
