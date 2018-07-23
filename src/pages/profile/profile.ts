import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { HttpClient } from '@angular/common/http';
import { ENV } from '@app/env';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _user: User,
    public loader: LoadingController,
    public toastCtrl: ToastController,
    public _http: HttpClient) {
  }
  editting: Boolean = false;
  chartData: any[] = [];


  charts: string = "/charts"
  token_url: string = "?access_token="
  appUser_url: string = 'api/appUsers/'
  base_url: string = ENV.URL
  userID = sessionStorage.getItem('userId');
  token = sessionStorage.getItem('token');

  ionViewDidLoad() {
    let loader = this.loader.create({
    })
    loader.present()
        this.chartData = JSON.parse(localStorage.getItem('savedCharts')) ? JSON.parse(localStorage.getItem('savedCharts')) : [] 
        loader.dismiss();
  }

  // allowEdit() {
  //   this.editting = true;
  // }

  // updateProfile(){
  //   let loader = this.loader.create({
  //   })
  //   loader.present()
  //   this._user.updateUser()
  //   .subscribe(_ => {
  //     loader.dismiss();
  //     this.editting = false;
  //   }, err => {
  //     console.error(err)
  //     loader.dismiss()
  //     let toast = this.toastCtrl.create({
  //       message: 'Unable to update at this time',
  //       duration: 2000,
  //       position: 'top'
  //     });
  //     toast.present()
  //   })
  // }

  getSavedChart(chart) {
    this.navCtrl.setRoot('ChartPage', {
      data: chart
    })
  }

  goToInput() {
    this.navCtrl.setRoot("ChartPage")
  }

  deleteChart(chartIndex) {
    this._user.deleteChart(chartIndex)
    this.chartData = JSON.parse(localStorage.getItem('savedCharts'))
  }

}
