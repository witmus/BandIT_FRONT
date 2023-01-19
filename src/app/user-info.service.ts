import { Injectable } from '@angular/core';
import { UserDto } from './api';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor() { }

  setUserInfo(userInfo: UserDto): void {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getUserInfo(): UserDto {
    const user = localStorage.getItem('userInfo');
    return JSON.parse(localStorage.getItem('userInfo') ?? 'null');
  }

  clearUserInfo(): void {
    localStorage.removeItem('userInfo');
  }
}
