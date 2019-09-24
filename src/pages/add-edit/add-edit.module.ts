import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditPage } from './add-edit';

@NgModule({
  declarations: [
    AddEditPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditPage),
  ],
})
export class AddEditPageModule {}
