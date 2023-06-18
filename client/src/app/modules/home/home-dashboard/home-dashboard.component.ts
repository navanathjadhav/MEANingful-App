import { Component, OnInit } from '@angular/core';
import { Launch } from '../types/home';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  launch!: Launch
  showDrinkWater!: boolean
  constructor(private http: HttpClient) { }

  getSpaceXLaunches() {
    this.http.get(environment.SPACEX_API_URL).subscribe({
      next: (launchResponse) => {
        this.launch = launchResponse as Launch
      },
      error: (error) => {
        console.log(error.message)
      }
    })
  }

  ngOnInit(): void {
    this.getSpaceXLaunches();
  }

}
