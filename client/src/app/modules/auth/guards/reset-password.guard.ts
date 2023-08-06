import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const token = state.root.queryParams['token']
    return this.authService.verifyResetPassword(token).pipe(
      map((result: any) => {
        if (result && result.verified) {
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          return false;
        }
      }),
    );
  }

}
