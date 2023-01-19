import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, UserDto } from '../api';
import { TokenService } from '../token.service';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userInfo: UserDto;

  constructor(
    private readonly userService: UserInfoService,
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
    private readonly router: Router,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.authService
      .apiAuthUserGet()
      .subscribe(
        (res: UserDto) => {
          this.userService.setUserInfo(res);
          this.userInfo = res;
        },
        (err) => {
          this.snackbar.open('Sesja wygasła, zaloguj się ponownie', '', { duration: 3000 });
          this.router.navigate(['login']);
        }
      )
  }

  logout(): void {
    this.tokenService.clearToken();
    this.userService.clearUserInfo();
    this.router.navigate(['login']);
  }

  open(module: string) : void {
    this.router.navigate([module]);
  }
}
