import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public nombre:string;
  public email: string;
  public imagen: string;
  public usuario: string;

  constructor(private authSvc: AuthService, private fotoService: FotoService) {
    this.nombre = this.authSvc.user.displayName;
    this.email = this.authSvc.user.email;
    this.imagen = this.authSvc.user.imageUrl;
    this.usuario = this.authSvc.user.userId;
  }

  logOut(){
    this.authSvc.logout();
  }

  public async takePhoto() {
    this.fotoService.takePhoto();
  }

  public choosePhoto(){
    this.fotoService.choosePhoto();
  }

  public getImage(){
    this.imagen = this.fotoService.getImagen();
  }

}
