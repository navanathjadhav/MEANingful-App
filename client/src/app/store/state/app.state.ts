import { Socket, User } from "src/app/modules/auth/types/user";

export interface AppState {
  readonly userStore: User;
  readonly socketStore: Socket;
}
