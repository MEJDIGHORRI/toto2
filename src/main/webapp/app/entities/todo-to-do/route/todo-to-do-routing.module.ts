import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TodoToDoComponent } from '../list/todo-to-do.component';
import { TodoToDoDetailComponent } from '../detail/todo-to-do-detail.component';
import { TodoToDoUpdateComponent } from '../update/todo-to-do-update.component';
import { TodoToDoRoutingResolveService } from './todo-to-do-routing-resolve.service';

const todoRoute: Routes = [
  {
    path: '',
    component: TodoToDoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TodoToDoDetailComponent,
    resolve: {
      todo: TodoToDoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TodoToDoUpdateComponent,
    resolve: {
      todo: TodoToDoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TodoToDoUpdateComponent,
    resolve: {
      todo: TodoToDoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(todoRoute)],
  exports: [RouterModule],
})
export class TodoToDoRoutingModule {}
