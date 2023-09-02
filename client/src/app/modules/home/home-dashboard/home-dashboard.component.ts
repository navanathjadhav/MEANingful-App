import { Component, OnInit } from '@angular/core';
import { Ship } from '../types/home';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  ships: Ship[] = []
  latestShips: Ship[] = []
  showDrinkWater!: boolean
  constructor(private http: HttpClient, private socketService: SocketService) { }

  getSpaceXShips() {
    this.http.get(environment.API_URL + '/api/ships').subscribe({
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
    setTimeout(() => {
      this.listenToReminder();
    }, 1500);
  }

  listenToReminder() {
    this.socketService.socket.on('drinkWaterReminder', (socketResponse: boolean) => {
      this.showDrinkWater = socketResponse
    });
  }
}
