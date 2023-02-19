import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TodoToDoDetailComponent } from './todo-to-do-detail.component';

describe('Component Tests', () => {
  describe('TodoToDo Management Detail Component', () => {
    let comp: TodoToDoDetailComponent;
    let fixture: ComponentFixture<TodoToDoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TodoToDoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ todo: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TodoToDoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TodoToDoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load todo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.todo).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
