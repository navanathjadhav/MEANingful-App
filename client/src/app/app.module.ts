import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';
import { socketReducer } from './store/reducers/socket.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    LayoutModule,
    StoreModule.forRoot({
      userStore: userReducer as any,
      socketStore: socketReducer as any,
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
