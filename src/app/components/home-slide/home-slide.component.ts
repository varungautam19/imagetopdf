import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { Camera, PictureSourceType, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageService } from 'src/app/providers/image-service';

@Component({
  selector: 'home-slide',
  templateUrl: './home-slide.component.html',
  styleUrls: ['./home-slide.component.scss'],
})
export class HomeSlideComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;
  @Output() onImageSelect = new EventEmitter();

  selectedImages: any[] = [];
  imageList: any[] = [];
  imgPreview: any;

  constructor(
    private camera: Camera,
    private platform: Platform,
    private imageService: ImageService,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  ngOnInit() { }

  uploadImages() {
    if (this.platform.is('capacitor')) {
      this.presentActionSheet();
    } else {
      this.fileInputRef.nativeElement.click();
    }
  }

  async presentActionSheet() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      mode: 'md',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(pictureSourceType: PictureSourceType) {
    const options: CameraOptions = this.imageService.cameraOptions(pictureSourceType);

    // this.camera.getPicture(options).then((imageData) => {
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   let image = this.imageService.b64toFile(base64Image);
    //   this.selectedImages.push(image);
    //   this.getImagesPreview();
    // });
  }

  onImageSelected() {
    let image = this.fileInputRef.nativeElement.files;
    for (let index = 0; index < image.length; index++) {
      this.selectedImages.push(image[index]);
    }
    this.getImagesPreview();
  }

  getImagesPreview() {
    const self = this;
    this.imageList = [];
    for (let index = 0; index < self.selectedImages.length; index++) {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        self.imageList.push({ url: fileReader.result, file: self.selectedImages[index], id: Math.random() });
      }
      fileReader.readAsDataURL(self.selectedImages[index]);
    }
  }

  removeImage(id) {
    this.selectedImages = [];
    const index = this.imageList.findIndex(x => x.id === id);
    this.imageList.splice(index, 1);
    this.selectedImages = this.imageList.map(x => x.file);
  }

  createPDF() {
    this.onImageSelect.emit(this.imageList);
  }

}
