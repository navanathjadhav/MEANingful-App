import { Component, OnInit } from '@angular/core';
import { Ship } from '../types/home';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  ships: Ship[] = []
  constructor(private http: HttpClient) { }

  getSpaceXShips() {
    this.http.get(environment.SPACEX_API_URL).subscribe({
      next: (shipsResponse) => {
        this.ships = shipsResponse as any
      },
      error: (error) => {
        console.log(error.message)
      }
    })
  }

  ngOnInit(): void {
    this.getSpaceXShips();
  }

}
