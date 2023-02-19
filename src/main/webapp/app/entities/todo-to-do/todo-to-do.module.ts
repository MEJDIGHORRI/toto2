import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TodoToDoComponent } from './list/todo-to-do.component';
import { TodoToDoDetailComponent } from './detail/todo-to-do-detail.component';
import { TodoToDoUpdateComponent } from './update/todo-to-do-update.component';
import { TodoToDoDeleteDialogComponent } from './delete/todo-to-do-delete-dialog.component';
import { TodoToDoRoutingModule } from './route/todo-to-do-routing.module';

@NgModule({
  imports: [SharedModule, TodoToDoRoutingModule],
  declarations: [TodoToDoComponent, TodoToDoDetailComponent, TodoToDoUpdateComponent, TodoToDoDeleteDialogComponent],
  entryComponents: [TodoToDoDeleteDialogComponent],
})
export class TodoToDoModule {}
