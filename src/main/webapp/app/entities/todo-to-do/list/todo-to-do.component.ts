import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITodoToDo } from '../todo-to-do.model';
import { TodoToDoService } from '../service/todo-to-do.service';
import { TodoToDoDeleteDialogComponent } from '../delete/todo-to-do-delete-dialog.component';

@Component({
  selector: 'jhi-todo-to-do',
  templateUrl: './todo-to-do.component.html',
})
export class TodoToDoComponent implements OnInit {
  todos?: ITodoToDo[];
  isLoading = false;

  constructor(protected todoService: TodoToDoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.todoService.query().subscribe(
      (res: HttpResponse<ITodoToDo[]>) => {
        this.isLoading = false;
        this.todos = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITodoToDo): number {
    return item.id!;
  }

  delete(todo: ITodoToDo): void {
    const modalRef = this.modalService.open(TodoToDoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.todo = todo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
