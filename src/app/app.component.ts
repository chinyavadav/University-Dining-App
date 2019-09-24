import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from "../providers/global/global";
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { MealMenuPage } from '../pages/meal-menu/meal-menu';
import { StatementPage } from '../pages/statement/statement';
import { CalculatorPage } from '../pages/calculator/calculator';
import { FeedbackPage } from '../pages/feedback/feedback';
import { TopupPage } from '../pages/topup/topup';
import { StaffLoginPage } from '../pages/staff-login/staff-login';
import { MealsPage } from '../pages/meals/meals';
import { FeedbacksPage } from '../pages/feedbacks/feedbacks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public storage: Storage, public global: GlobalProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
    { title: 'Home', component: HomePage },
    { title: 'Login', component: LoginPage},
    { title: 'Setttings', component: SettingsPage},
    { title: 'MealMenu', component: MealMenuPage },
    { title: 'Statement', component: StatementPage},
    { title: 'Calculator', component: CalculatorPage},
    { title: 'Feedback', component: FeedbackPage},
    { title: 'Topup', component: TopupPage},
    { title: 'Staff Login', component: StaffLoginPage},
    { title: 'Meals', component: MealsPage},
    { title: 'Feedbacks', component: FeedbacksPage}
    ];

  }

  initializeApp(){   
    this.platform.ready().then(() => {          
      this.storage.ready().then(()=> {
        this.storage.get('serverAddress').then((val) =>{
          this.setServerAddress(val);
        });
        this.storage.get('session').then((val) =>{
          this.setAccount(val);
        });
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setAccount(val){
    this.global.session=val;
    if(this.global.session==null){
      this.rootPage = LoginPage;
      this.global.session=null;
    }else{
      if(this.global.session.fldregno){
        this.global.accessLevel="STUDENT";
      }else{
        this.global.accessLevel="STAFF";
      }
      this.rootPage = HomePage;
    }
  }

  setServerAddress(val){
    if(val!=null){
      this.global.serverAddress=val;
    }else{
      this.global.serverAddress="http://msudh.000webhostapp.com/";
    }
  }

  openPage(index){
    let myPages=[MealMenuPage, StatementPage, CalculatorPage,FeedbackPage,SettingsPage,MealsPage,FeedbacksPage];
    this.nav.push(myPages[index]);
  }

  logout(){
    this.storage.remove("session"); 
    this.global.session=null;
    this.global.accessLevel=null;
    this.nav.setRoot(LoginPage);
  }
}
