import { Injectable } from '@angular/core';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';

@Injectable({
    providedIn: 'root',
})
export class ImageService {

    constructor(
        private camera: Camera
    ) { }

    cameraOptions(pictureSourceType: PictureSourceType) {
        return {
            quality: 50,
            allowEdit: true,
            sourceType: pictureSourceType,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            correctOrientation: true,
        }
    }

    b64toFile(dataURI): File {
        // convert the data URL to a byte string
        const byteString = atob(dataURI.split(',')[1]);
        // pull out the mime type from the data URL
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        // Convert to byte array
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        // Create a blob that looks like a file.
        const blob = new Blob([ab], { 'type': mimeString });
        blob['lastModifiedDate'] = (new Date()).toISOString();
        blob['name'] = 'file';
        // Figure out what extension the file should have
        switch (blob.type) {
            case 'image/jpeg':
                blob['name'] += '.jpg';
                break;
            case 'image/png':
                blob['name'] += '.png';
                break;
        }
        // cast to a File
        let img = new File([blob], blob['name'], { type: blob['type'] });
        return <File>img;
    }
}
