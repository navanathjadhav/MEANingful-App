import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import * as UserActions from './../../../store/actions/user.actions';
import { Router } from '@angular/router';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from local storage.
    const authToken = localStorage.getItem('access-token');

    // Clone the request and set the new header.
    if (authToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + authToken)
      });
    }

    // Pass on the cloned request instead of the original request.
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            localStorage.removeItem('access-token')
            this.store.dispatch(new UserActions.Logout(undefined))
            this.router.navigate(['/auth/login'])
          }
        }
        return throwError(() => new Error(err?.error?.message || 'Error occurred!'));
      })
    );
  }
}
