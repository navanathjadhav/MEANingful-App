import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/state/app.state';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../core/services/http.service';
import { SocketService } from '../../core/services/socket.service';
import { User, UserResponse } from '../types/user';
import * as UserActions from './../../../store/actions/user.actions';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$!: Observable<User>;

  constructor(private httpService: HttpService, private store: Store<AppState>, private router: Router, private socketService: SocketService) {

    if (this.getToken()) {
      this.getCurrentUser().subscribe((response: any) => {
        this.store.dispatch(new UserActions.CurrentUser(response))
        this.socketService.createSocketConnection()
        this.socketService.joinRoom(response._id)
      })
    }

    this.currentUser$ = this.store.select('userStore');
  }

  login(username: string, password: string) {
    return this.httpService.post('/api/auth/login', { email: username, password })
      .pipe(map((user: object | any) => {
        // login successful if there's a jwt token in the response
        this.afterLogin(user)
        return user;
      }));
  }

  getCurrentUser() {
    return this.httpService.get('/api/auth/self');
  }

  getToken() {
    return localStorage.getItem('access-token')
  }

  isAuthenticated() {
    return localStorage.getItem('access-token')
  }

  register(payload: User) {
    return this.httpService.post('/api/auth/signup', payload)
      .pipe(map((user: object | any) => {
        // login user directly if there's a jwt token in the response
        this.afterLogin(user)
        return user;
      }));
  }


  forgotPassword(email: string) {
    return this.httpService.post('/api/auth/forgot-password', { email });
  }

  resetPassword(password: string, token: string) {
    return this.httpService.post(`/api/auth/reset-password?token=${token}`, { password });
  }

  verifyResetPassword(token: string) {
    return this.httpService.get(`/api/auth/reset-password?token=${token}`);
  }

  logout() {
    // remove user from local storage to log user out
    const decodedToken: any = jwt_decode(this.getToken() as any)
    this.socketService.leaveRoom(decodedToken.sub)
    localStorage.removeItem('access-token')
    this.store.dispatch(new UserActions.Logout(undefined))
    this.router.navigate(['/auth/login'])
  }

  afterLogin(user: UserResponse) {
    if (user.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('access-token', user.token)
      this.store.dispatch(new UserActions.CurrentUser(user.user))
      this.socketService.createSocketConnection()
      this.socketService.joinRoom(user.user._id as string)
      this.router.navigate([environment.DEFAULT_POST_LOGIN_URL])
    }
  }
}
