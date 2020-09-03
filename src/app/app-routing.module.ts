import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'List of Users' }
      },
      {
        path: 'user-details/:id',
        component: UserDetailComponent,
        data: { title: 'User Details' }
      },
      {
        path: 'user-add',
        component: UserAddComponent,
        data: { title: 'Add User' }
      },
      {
        path: 'user-edit/:id',
        component: UserEditComponent,
        data: { title: 'Edit User' }
      },
      { path: '',
        redirectTo: '/users',
        pathMatch: 'full'
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
