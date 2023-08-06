import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import * as SocketActions from './../../../store/actions/socket.actions';
import { Socket as SocketType } from '../../auth/types/user';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket!: Socket;
  constructor(private store: Store<AppState>) { }

  // This method creates a new Socket.IO connection to the server.
  createSocketConnection() {
    // Connect to the server using the SOCKET_URL environment variable.
    this.socket = io(environment.SOCKET_URL);

    // Listen for the 'updateCurrentUserCount' event from the server and dispatch the data to the store.
    this.socket.on('updateCurrentUserCount', (socketResponse: SocketType) => {
      this.store.dispatch(new SocketActions.CurrentUserCount(socketResponse))
    });

    // Listen for the 'disconnect' event from the server and log a message to the console.
    this.socket.on('disconnect', () => {
      console.log('Disconnected')
    });
  }

  // This method sends a 'joinRoom' event to the server with the specified user ID.
  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }

  // This method sends a 'leaveRoom' event to the server with the specified user ID.
  leaveRoom(userId: string) {
    this.socket.emit('leaveRoom', userId);
  }

  // This method attempts to disconnect the Socket.IO connection.
  disconnect() {
    try {
      this.socket.disconnect();
    } catch (error) {
      console.log(error)
    }
  }

}
