import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs';
import { AuthService, UserDto, UserRole } from '../api';
import { Authenticable } from '../authenticable';
import { UserRoles } from '../enums';
import { UserInfoService } from '../user-info.service';
import { AssignRoleComponent } from './assign-role/assign-role.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent extends Authenticable {

  users: UserDto[];
  dataSource: MatTableDataSource<UserDto>;
  displayedColumns: string[] = ['name', 'email', 'role', 'action'];
  userRoles = UserRoles.Types;

  @ViewChild(MatTable) table: MatTable<UserDto>;
  
  constructor(
    userService: UserInfoService,
    router: Router,
    snackbar: MatSnackBar,
    public dialog: MatDialog,
    private readonly authService: AuthService,
  ){
    super(userService, router, snackbar);
  }

  ngOnInit(): void {
    this.checkUserLoggedIn();

    if(this.userInfo.role < 3){
      this.snackbar.open('Brak uprawnień.', '', { duration: 3000 });
      this.router.navigate(['dashboard']);
    }

    const bandId = this.userInfo?.band?.id ?? 0;
    
    this.authService
      .apiAuthUsersBandIdGet(bandId)
      .subscribe(
        (res) => {
          this.users = res;
          this.dataSource = new MatTableDataSource(this.users);
        }
      )
  }

  changeRole(user: UserDto): void {
    this.dialog
      .open(AssignRoleComponent, {
        data: user
      })
      .afterClosed()
      .pipe(
        filter((res: number) => res != null && res !== this.userInfo.role),
        mergeMap((res: number) => {
          return this.authService
            .apiAuthUserUserIdPatch(user?.id ?? '', res as UserRole, user.role);
        })
      )
      .subscribe(
        (res: UserDto) => {
          this.users[this.users.findIndex(u => u.id === res.id)].role = res.role;
          this.table.renderRows();
        }
      )
  }

}
