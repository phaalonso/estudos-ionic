import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

const { Camera } = Plugins;

export interface Photo {
  webViewPath: string;
  format: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];

  constructor() { }

  /**
   * addNewToGallery
   */
  public async addNewToGallery() {
    //Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const blob = await fetch(capturedPhoto.webPath).then(r => r.blob());

    this.photos.unshift({
      webViewPath: capturedPhoto.path,
      format: capturedPhoto.format
    });

    console.log(this.photos[0]);

  }
}
