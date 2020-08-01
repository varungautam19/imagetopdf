import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { RouterModule } from '@angular/router';
import { SlideModule } from '../components/slide.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlideModule,
    RouterModule.forChild([
      { path: '', component: HomePage }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
