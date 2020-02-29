import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UiService } from '../services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  public image: string;
  constructor(private camera: Camera, private ui: UiService) { }

  public choosePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then(async (imageData) => {
      await this.ui.generateImage('data:image/jpeg;base64,' + imageData, 100, 300, 300).then(im => {
        this.image = 'data:image/jpeg;base64,' + im;
      }).catch(async err => {
        console.log('ERROR DE COMPRESIÓN' + err);
        this.image === undefined;
        // await this.ui.presentAlert('Error','','Archivo no válido');

      });
    }, (err) => {
      console.log('ERROR EN LA CÁMARA ' + err);
      // this.ui.presentToast('Ha ocurrido un error al cargar la cámara', 'danger');
    });
  }

  public takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options).then(async (imageData) => {
      await this.ui.generateImage('data:image/jpeg;base64,' + imageData, 100, 300, 300).then(im => {
        this.image = 'data:image/jpeg;base64,' + im;
        return true
      }).catch(err => {
        console.log('ERROR DE COMPRESIÓN' + err);
        this.image === undefined;
        return false

      });
    }, (err) => {
      console.log('ERROR EN LA CÁMARA ' + err);
      // this.ui.presentToast('Ha ocurrido un error al cargar la cámara', 'danger');
    });

  }

  public setImagen(image: string) {
    this.image = image;
  }

  public getImagen(loqusea?:any) {
    return this.image;
  }


}
