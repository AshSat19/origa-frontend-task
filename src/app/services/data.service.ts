import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.public_API_URL;
  }

  fetchUsersData() {
    return this.http.get(this.API_URL);
  }
}
