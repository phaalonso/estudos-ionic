import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public photoService: PhotoService, private api: ApiService) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  sendPost() {
    const photos = this.photoService.photos;
    
    const webviewPath = photos.map (p => p.webViewPath)
    
    this.api.uploadAll(webviewPath);
  }

}