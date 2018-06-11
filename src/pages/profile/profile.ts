import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { HttpClient } from '@angular/common/http';
//import { NgForm } from '@angular/forms';

// import { WelcomePage } from '../welcome/welcome';
// import { SavedPage } from '../saved/saved';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _user: User,
    public _http: HttpClient) {
  }
  name_url: string = "https://guarded-meadow-99845.herokuapp.com/api/appUsers?access_token="
  //user: this._user
  token = sessionStorage.getItem('token');

  // getName() {
  //   console.log(this.name_url + this.token);
  //   return this._http.get(this.name_url + this.token);
  // }
  ionViewDidLoad() {
  }
  logoutUser() {
    this.navCtrl.setRoot("WelcomePage")
      .then(() => {
        this._user.logout();
        console.log("User is logged out", this._user.user)
      });
  }
  mySavedCharts() {
    this.navCtrl.setRoot("SavedPage");
  }
}
