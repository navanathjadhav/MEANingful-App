import { Socket } from "src/app/modules/auth/types/user";
import * as SocketActions from '../actions/socket.actions';

const initialState: Socket = {
  activeUserCount: 0,
}

export function socketReducer(state: Socket = initialState, action: SocketActions.Actions) {
  switch (action.type) {
    case SocketActions.UPDATE_COUNT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
