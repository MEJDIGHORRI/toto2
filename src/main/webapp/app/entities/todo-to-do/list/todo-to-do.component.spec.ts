import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TodoToDoService } from '../service/todo-to-do.service';

import { TodoToDoComponent } from './todo-to-do.component';

describe('Component Tests', () => {
  describe('TodoToDo Management Component', () => {
    let comp: TodoToDoComponent;
    let fixture: ComponentFixture<TodoToDoComponent>;
    let service: TodoToDoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TodoToDoComponent],
      })
        .overrideTemplate(TodoToDoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TodoToDoComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TodoToDoService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.todos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
