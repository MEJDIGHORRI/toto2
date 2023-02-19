import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITodoToDo, TodoToDo } from '../todo-to-do.model';
import { TodoToDoService } from '../service/todo-to-do.service';

@Component({
  selector: 'jhi-todo-to-do-update',
  templateUrl: './todo-to-do-update.component.html',
})
export class TodoToDoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    state: [],
    description: [],
  });

  constructor(protected todoService: TodoToDoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ todo }) => {
      this.updateForm(todo);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const todo = this.createFromForm();
    if (todo.id !== undefined) {
      this.subscribeToSaveResponse(this.todoService.update(todo));
    } else {
      this.subscribeToSaveResponse(this.todoService.create(todo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITodoToDo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(todo: ITodoToDo): void {
    this.editForm.patchValue({
      id: todo.id,
      title: todo.title,
      state: todo.state,
      description: todo.description,
    });
  }

  protected createFromForm(): ITodoToDo {
    return {
      ...new TodoToDo(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      state: this.editForm.get(['state'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
