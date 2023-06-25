import { Action } from '@ngrx/store';
import { User } from 'src/app/modules/auth/types/user';

export const CURRENT_USER = 'Current User';
export const LOGOUT = 'Logout';

export class CurrentUser implements Action {
  readonly type = CURRENT_USER;

  constructor(public payload: User) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor(public payload: undefined) { }
}


export type Actions = CurrentUser | Logout;
