import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { UserDto } from "./api";
import { UserInfoService } from "./user-info.service";

export class Authenticable {
    
  userInfo: UserDto;
  
  constructor(
    protected readonly userService: UserInfoService,
    protected readonly router: Router,
    public snackbar: MatSnackBar
  ) { }

  checkUserLoggedIn(): void {
    this.userInfo = this.userService.getUserInfo();
    if(!this.userInfo){
        this.snackbar.open('Sesja wygasła, zaloguj się ponownie', '', { duration: 3000, panelClass: 'snackbar' });
        this.router.navigate(['login']);
    }
  }

  goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
