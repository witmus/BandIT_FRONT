import { Component, OnInit } from '@angular/core';
import { AuthService, LoginDto, UserDto } from '../api';
import { TokenService } from '../token.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  login() : void {
    if(this.loginForm.invalid){
      return this.loginForm.markAllAsTouched();
    }

    const loginDto : LoginDto = {
      userName: btoa(this.loginForm.value.userName),
      password: btoa(this.loginForm.value.password)
    }

    this.authService
      .apiAuthLoginPost(loginDto)
      .subscribe(
        res => {
          this.tokenService.setToken(res.token)
          this.router.navigate(['dashboard']);
        },
        err => {
          this.snackBar.open('Błędne dane logowania', '', { duration: 3000 });
          this.loginForm.controls['password'].setValue('');
        }
      );
  }

  navigateSignup(){
    this.router.navigate(['signup']);
  }
}
