import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { HttpService } from './services/http.service';
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
  ],
})
export class CoreModule { }
