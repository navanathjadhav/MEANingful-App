import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { RandomColorDirective } from 'src/app/directives/random-color.directive';


@NgModule({
  declarations: [
    HomeDashboardComponent,
    RandomColorDirective
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
})
export class HomeModule { }
