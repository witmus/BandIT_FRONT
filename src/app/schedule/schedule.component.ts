import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Authenticable } from '../authenticable';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent extends Authenticable implements OnInit {

  constructor(
    userService: UserInfoService,
    router: Router,
    snackbar: MatSnackBar
  ){ super(userService, router, snackbar); }

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }

}
