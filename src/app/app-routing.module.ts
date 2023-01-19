import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { BudgetComponent } from './budget/budget.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GearComponent } from './gear/gear.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'gear', component: GearComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'password', component: ChangePasswordComponent },
  { path: 'users', component: UsersListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: DashboardComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
