import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Configuration } from './api';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TokenService } from './token.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenInterceptor } from './token.interceptor';
import { UserInfoService } from './user-info.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetComponent } from './budget/budget.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GearComponent } from './gear/gear.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ContactTypePipe } from './contact-type.pipe';
import { GearTypePipe } from './gear-type.pipe';
import { AddItemComponent } from './gear/add-item/add-item.component';
import { AddPositionComponent } from './budget/add-position/add-position.component';
import { PositionTypePipe } from './position-type.pipe';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddEventComponent } from './schedule/add-event/add-event.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRolePipe } from './user-role.pipe';
import { AssignRoleComponent } from './users-list/assign-role/assign-role.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    BudgetComponent,
    ContactsComponent,
    GearComponent,
    ScheduleComponent,
    AddContactComponent,
    ContactTypePipe,
    GearTypePipe,
    AddItemComponent,
    AddPositionComponent,
    PositionTypePipe,
    ChangePasswordComponent,
    AddEventComponent,
    UsersListComponent,
    UserRolePipe,
    AssignRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    TokenService,
    UserInfoService,
    {
      provide: Configuration,
      useFactory: () => 
        new Configuration({
          basePath: 'http://localhost:5109'
      }),
      deps: [TokenService], multi: false
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
