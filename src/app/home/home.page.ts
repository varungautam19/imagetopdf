import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  selectedImages: any = [];
  slideNo: any = 0;

  constructor() { }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  async nextSlide(event: any) {
    this.selectedImages = event;
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    this.slideNo = await this.slides.getActiveIndex();
  }

  async backbtn() {
    this.selectedImages = [];
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    this.slideNo = await this.slides.getActiveIndex();
  }

}
