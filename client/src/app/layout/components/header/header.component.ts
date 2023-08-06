import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { User } from 'src/app/modules/auth/types/user';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser!: User
  currentActiveUserCount!: number
  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user
    })

    this.store.select('socketStore').subscribe(data => {
      this.currentActiveUserCount = data.activeUserCount
    })
  }

  logout() {
    this.authService.logout()
  }
}
