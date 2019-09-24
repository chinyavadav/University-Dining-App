import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealMenuPage } from './meal-menu';

@NgModule({
  declarations: [
    MealMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MealMenuPage),
  ],
})
export class MealMenuPageModule {}
