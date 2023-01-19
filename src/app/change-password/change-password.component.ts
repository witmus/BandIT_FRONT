import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, ChangePasswordDto } from '../api';
import { Authenticable } from '../authenticable';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends Authenticable {
  changePasswordForm: FormGroup;

  constructor(
    userService: UserInfoService,
    router: Router,
    snackbar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ){
    super(userService, router, snackbar);
  }

  ngOnInit(): void {
    this.checkUserLoggedIn();

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    })
  }

  changePassword(): void {
    const form = this.changePasswordForm.value;

    if(form.newPassword !== form.confirmPassword){
      this.snackbar.open('Podane hasła różnią się', '', {duration: 3000});
      return;
    }

    const dto: ChangePasswordDto = {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword
    }

    this.authService
      .apiAuthPasswordPost(dto)
      .subscribe(
        (res) => {
          this.snackbar.open('Pomyślnie zmieniono hasło!', '', { duration: 3000 });
          this.router.navigate(['dashboard']);
        },
        (err) => {
          this.snackbar.open(err.error[0].description, '', { duration: 3000 });
        }
      )
  }

  cancel(): void {
    this.router.navigate(['dashboard'])
  }
}
