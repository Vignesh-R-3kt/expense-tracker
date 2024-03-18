import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiEndPoint: string = 'https://expense-tracker-fbef2-default-rtdb.firebaseio.com/expenses';
  private userID: string;

  constructor(private http: HttpClient) {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || '');
    this.userID = userInfo.user.uid;
  }

  fetchUserdata(month: any, year: any) {
    return this.http.get(`${this.apiEndPoint}/${this.userID}/${year}/${month}.json`);
  }

  sendUserData(month: any, year: any, data: any) {
    return this.http.put(`${this.apiEndPoint}/${this.userID}/${year}/${month}.json`, data);
  }

}