import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiEndPoint: string = 'https://expense-tracker-fbef2-default-rtdb.firebaseio.com/expenses';
  private userID: string;
  private month: number = new Date().getMonth() + 1;
  private year: number = new Date().getFullYear();

  constructor(private http: HttpClient) {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || '');
    this.userID = userInfo.user.uid;
  }

  fetchUserdata() {
    return this.http.get(`${this.apiEndPoint}/${this.userID}/${this.year}/${this.month}.json`);
  }

  sendUserData(data: any) {
    return this.http.put(`${this.apiEndPoint}/${this.userID}/${this.year}/${this.month}.json`, data);
  }

}