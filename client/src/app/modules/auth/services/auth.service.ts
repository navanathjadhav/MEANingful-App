import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../types/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login() {
    const user: User = {
      company: "XYZ Corp",
      email: "navanath@test.com",
      name: "Navanath Jadhav",
      role: "admin",
      id: "1001"
    }

    this.afterLogin(user)
    return user
  }

  getCurrentUser() {
    return {
      company: "XYZ Corp",
      email: "navanath@test.com",
      name: "Navanath Jadhav",
      role: "admin",
      id: "1001"
    }
  }

  register() {
    const user: User = {
      company: "XYZ Corp",
      email: "navanath@test.com",
      name: "Navanath Jadhav",
      role: "admin",
      id: "1001"
    }
    this.afterLogin(user)
    return user
  }

  logout() {
    this.router.navigate(['/auth/login'])
  }

  afterLogin(user: User) {
    if (user.id) {
      this.router.navigate([environment.DEFAULT_POST_LOGIN_URL])
    }
  }
}
