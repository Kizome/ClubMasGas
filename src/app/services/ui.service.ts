import { Injectable } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { motos } from '../model/motos.interface';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private loadingController: LoadingController, private modal: ModalController,
    private load: LoadingController,
    private toast: ToastController) { }
  loading: HTMLIonLoadingElement;
  ngOnInit() { }

  public async presentLoading() {
    await this.hideLoading();
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
  }

  public async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
    this.loading = null;
  }

  public async showModal(modalPage: any, props?: motos): Promise<any> {
    let modal;
    if (props) {
      modal = await this.modal.create({
        component: modalPage,
        componentProps: {
          'id': props.id,
          'cilindrada': props.cilindrada,
          'color': props.color,
          'marca': props.marca,
          'modelo': props.modelo,
          'tipo': props.tipo,
          'imagen': props.imagen
        }
      });
    }else{
      modal = await this.modal.create({
        component: modalPage,
        componentProps: {
          'id': '',
          'cilindrada': 0,
          'color': '',
          'marca': '',
          'modelo': '',
          'tipo': '',
          'imagen': ''
        }
      });
    }
    await modal.present();
    return await modal.onWillDismiss();
  }

  public async showToast(msg: string, duration: number, color: string, position?: any) {
    const _toast = await this.toast.create({
      message: msg,
      duration: duration,
      color: color,
      position: position
    });
    await _toast.present();
  }

  generateImage(
    img: string,
    quality: number = 100,
    MAX_WIDTH: number,
    MAX_HEIGHT: number
  ) {
    return new Promise((resolve, reject) => {
      const canvas: any = document.createElement('canvas');
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = img;
      image.onload = () => {
        let width = image.width;
        let height = image.height;
        if (!MAX_HEIGHT) {
          MAX_HEIGHT = image.height;
        }
        if (!MAX_WIDTH) {
          MAX_WIDTH = image.width;
        }
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        const dataUrl = canvas
          .toDataURL('image/jpeg', quality)
          .replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        resolve(dataUrl);
      };
      image.onerror = e => {
        reject(e);
      };
    });
  }
  getImageFromBase64(base64: string) {
    return 'data:image/jpeg;base64,' + base64;
  }
}
