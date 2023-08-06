import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../modules/core/core.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AppLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
