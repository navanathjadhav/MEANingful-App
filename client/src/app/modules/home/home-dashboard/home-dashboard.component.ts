import { Component, OnInit } from '@angular/core';
import { Ship } from '../types/home';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  ships: Ship[] = []
  latestShips: Ship[] = []
  constructor(private http: HttpClient) { }

  getSpaceXShips() {
    this.http.get(environment.SPACEX_API_URL).subscribe({
      next: (shipsResponse) => {
        this.ships = shipsResponse as any
        this.latestShips = _.filter(shipsResponse, ((data: Ship) => moment(data.year_built, 'YYYY').isAfter("2014"))) as any
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
