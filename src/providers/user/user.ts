import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../api/api';
import { ENV } from '@app/env';

@Injectable()
export class User {
  base_url: string = ENV.URL;
  appUsers_url: string = "api/appUsers/"
  token_url: string = "?access_token="
  login_url: string = "api/appUsers/login?include=user"
  logout_url: string = "logout?access_token="
  register_url: string = "api/appUsers"
  user: any;
  userBirthday: string = ''
  helloWorld: string = "hello world"
  charts: any[] = []
  chart_url: string = "/charts?access_token="

  constructor(public api: Api, public http: HttpClient) { 
    this.charts = JSON.parse(localStorage.getItem('savedCharts'))
  }

  loginCustom(user) {
    return this.http.post(this.base_url + this.login_url, user)
  }

  signupCustom(signupUser) {
    return this.http.post(this.base_url + this.register_url, signupUser)
  }

  logout() {
    let token = sessionStorage.getItem('token');
    this.http.post(this.base_url + this.appUsers_url + this.logout_url + token, this.user)
    .subscribe(() => {
      this.user = null;
      sessionStorage.clear();
    })
  }

  savedChart(chart) {
    // let userID = sessionStorage.getItem('userId');
    // let token = sessionStorage.getItem('token');
    // return this.http.post(this.base_url + this.appUsers_url + userID + this.chart_url + token, chart)
    if(!this.charts) this.charts = [];
    this.charts.push(chart)
    localStorage.setItem('savedCharts', JSON.stringify(this.charts))
  }

  deleteChart(index){
    this.charts.splice(index, 1);
    localStorage.setItem('savedCharts', JSON.stringify(this.charts))
  }

  updateUser() {
    let userID = sessionStorage.getItem('userId')
    let token = sessionStorage.getItem('token')
    return this.http.patch(this.base_url + this.appUsers_url + userID + this.token_url + token, this.user)
  }
}
