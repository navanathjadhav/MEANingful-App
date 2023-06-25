import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LayoutModule,
    StoreModule.forRoot({
      userStore: userReducer as any
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
