import { User } from "src/app/modules/auth/types/user";
import * as UserActions from './../actions/user.actions';

const initialState: User = {
  name: '',
  company: '',
  email: '',
  role: ''
}

export function userReducer(state: User = initialState, action: UserActions.Actions) {
  switch (action.type) {
    case UserActions.CURRENT_USER:
      return { ...state, ...action.payload };
    case UserActions.LOGOUT:
      return action.payload;
    default:
      return state;
  }
}
