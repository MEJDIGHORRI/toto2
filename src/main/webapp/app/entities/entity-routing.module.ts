import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'todo-to-do',
        data: { pageTitle: 'toDoApp.todo.home.title' },
        loadChildren: () => import('./todo-to-do/todo-to-do.module').then(m => m.TodoToDoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
