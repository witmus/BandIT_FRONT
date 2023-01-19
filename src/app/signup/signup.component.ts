import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, RegisterDto, UserRole } from '../api';
import { CustomErrors } from '../errors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  role: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null],
      phoneNumber: [null],
      email: [null, Validators.required],
      accessCode: [null, Validators.required],
      bandName: [null],
      bandTIN: [null]
    })
  }

  signup(): void {
    const formValue = this.signupForm.value;
    
    const dto: RegisterDto = {
      userName: formValue.userName,
      password: formValue.password,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phoneNumber: formValue.phoneNumber,
      email: formValue.email,
      accessCode: formValue.accessCode,
      bandName: formValue.bandName,
      bandTIN: formValue.bandTIN,
      role: parseInt(this.role) as UserRole,
    };

    this.authService.apiAuthRegisterPost(dto).subscribe(
      (res) => {
        this.snackBar.open('Pomyślnie założono konto', '', { duration: 3000 });
        this.returnToLogin();
      },
      (err) => {
        this.snackBar.open(CustomErrors.Get(err.error), '', { duration: 3000 });
      }
    );
  }

  returnToLogin(): void {
    this.router.navigate(['login']);
  }
}
