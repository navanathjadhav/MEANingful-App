import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../types/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = {
    company: "XYZ Corp",
    email: "navanath@test.com",
    name: "Navanath Jadhav",
    role: "admin",
    id: "1001"
  }

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);

  constructor(private router: Router) { }

  login() {
    this.afterLogin(this.user)
  }

  getCurrentUser() {
    return this.userSubject.asObservable();
  }

  register() {
    this.afterLogin(this.user)
  }

  logout() {
    this.router.navigate(['/auth/login'])
  }

  afterLogin(user: User) {
    this.userSubject.next(user);
    if (user.id) {
      this.router.navigate([environment.DEFAULT_POST_LOGIN_URL])
    }
  }
}
