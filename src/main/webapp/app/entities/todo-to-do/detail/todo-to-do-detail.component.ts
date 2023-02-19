import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITodoToDo } from '../todo-to-do.model';

@Component({
  selector: 'jhi-todo-to-do-detail',
  templateUrl: './todo-to-do-detail.component.html',
})
export class TodoToDoDetailComponent implements OnInit {
  todo: ITodoToDo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ todo }) => {
      this.todo = todo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
