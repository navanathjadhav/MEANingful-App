import { Action } from '@ngrx/store';
import { Socket } from 'src/app/modules/auth/types/user';

export const UPDATE_COUNT = 'Update Count';

export class CurrentUserCount implements Action {
  readonly type = UPDATE_COUNT;

  constructor(public payload: Socket) { }
}

export type Actions = CurrentUserCount;
