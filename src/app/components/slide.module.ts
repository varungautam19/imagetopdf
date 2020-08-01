import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeSlideComponent } from './home-slide/home-slide.component';
import { ViewSlideComponent } from './view-slide/view-slide.component';
import { Camera } from '@ionic-native/camera/ngx';
import { ImageService } from '../providers/image-service';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
    ],
    declarations: [
        HomeSlideComponent,
        ViewSlideComponent,
    ],
    exports: [
        HomeSlideComponent,
        ViewSlideComponent,
    ],
    providers: [
        Camera,
        ImageService
    ]
})
export class SlideModule { }