import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, MenuController } from 'ionic-angular';
import { FirstRunPage } from '../pages';
import { User } from '../providers/user/user';


@Component({
  template: `<ion-menu [content]="content" type="overlay">
  <ion-header>
    <ion-toolbar>
      <ion-title>Menu</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content id="sideMenu">
    <ion-list no-lines>
      <button menuClose ion-item detail-none *ngFor="let p of pages" (click)="openPage(p)" id="menuBtn">
        <ion-icon name="{{p.icon}}" class="menu-icon"></ion-icon> {{p.title}}
      </button>
    </ion-list>
  </ion-content>
</ion-menu>

<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`
})
export class MyApp {
  rootPage = localStorage.getItem('viewedTutorial') ? 'ChartPage' : FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage', icon: 'paper' },
    { title: 'Saved Charts', component: 'ProfilePage', icon: 'person' },
    { title: 'New Chart', component: 'ChartPage', icon: 'podium' },
    { title: 'About', component: 'AboutPage', icon: 'podium'},
  ]

  constructor(
    private translate: TranslateService, 
    private platform: Platform, 
    private config: Config, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public _user: User
    ) {
    platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en');
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // logoutUser() {
  //   this.nav.setRoot("WelcomePage")
  //     .then(() => {
  //       this._user.logout();
  //       this.menuCtrl.enable(false);
  //       this.menuCtrl.swipeEnable(false);
  //       console.log("User is logged out", this._user.user)
  //     });
  // }
}
