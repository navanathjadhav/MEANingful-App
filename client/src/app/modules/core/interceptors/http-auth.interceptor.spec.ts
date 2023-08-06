import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { HttpAuthInterceptor } from './http-auth.interceptor';

describe('HttpAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientModule,
      StoreModule.forRoot({}, {}),
    ],
    providers: [
      HttpAuthInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: HttpAuthInterceptor = TestBed.inject(HttpAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
