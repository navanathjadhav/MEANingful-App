import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../types/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import * as UserActions from './../../../store/actions/user.actions';


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

  currentUser$!: Observable<User>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.store.dispatch(new UserActions.CurrentUser(this.user))
    this.currentUser$ = this.store.select('userStore');
  }

  login() {
    this.afterLogin(this.user)
  }

  register() {
    this.afterLogin(this.user)
  }

  logout() {
    this.store.dispatch(new UserActions.Logout(undefined))
    this.router.navigate(['/auth/login'])
  }

  afterLogin(user: User) {
    this.store.dispatch(new UserActions.CurrentUser(user))
    if (user.id) {
      this.router.navigate([environment.DEFAULT_POST_LOGIN_URL])
    }
  }
}
