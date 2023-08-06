import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  API_URL: string = environment.API_URL;
  post(url: string, data: object) {
    return this.http.post(this.API_URL + url, data);
  }


  get(url: string) {
    return this.http.get(this.API_URL + url);
  }


  delete(url: string) {
    return this.http.delete(this.API_URL + url);
  }


  put(url: string, data: object) {
    return this.http.put(this.API_URL + url, data);
  }


  patch(url: string, data: object) {
    return this.http.patch(this.API_URL + url, data);
  }

}
