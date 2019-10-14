import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
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
import { AddEditPage } from '../pages/add-edit/add-edit';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule} from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SettingsPage,
    MealMenuPage,
    StatementPage,
    CalculatorPage,
    FeedbackPage,
    TopupPage,
    StaffLoginPage,
    MealsPage,
    FeedbacksPage,
    AddEditPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SettingsPage,
    MealMenuPage,
    StatementPage,
    CalculatorPage,
    FeedbackPage,
    TopupPage,
    StaffLoginPage,
    MealsPage,
    FeedbacksPage,
    AddEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    Camera,
  ]
})
export class AppModule {}
