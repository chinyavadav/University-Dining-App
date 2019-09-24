import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbacksPage } from './feedbacks';

@NgModule({
  declarations: [
    FeedbacksPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbacksPage),
  ],
})
export class FeedbacksPageModule {}
