import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealsPage } from './meals';

@NgModule({
  declarations: [
    MealsPage,
  ],
  imports: [
    IonicPageModule.forChild(MealsPage),
  ],
})
export class MealsPageModule {}
