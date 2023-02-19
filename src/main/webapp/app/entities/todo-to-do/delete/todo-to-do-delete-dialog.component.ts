import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITodoToDo } from '../todo-to-do.model';
import { TodoToDoService } from '../service/todo-to-do.service';

@Component({
  templateUrl: './todo-to-do-delete-dialog.component.html',
})
export class TodoToDoDeleteDialogComponent {
  todo?: ITodoToDo;

  constructor(protected todoService: TodoToDoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.todoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
