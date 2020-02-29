import { Component, OnInit } from '@angular/core';
import { motos } from '../model/motos.interface';
import { ApiService } from '../services/api.service';
import { UiService } from '../services/ui.service';
import { FormPage } from '../form/form.page';
import { AlertasService } from '../services/alertas.service';
// import { VirtualScroll } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { IonVirtualScroll } from '@ionic/angular';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild('virtualScroll', { static: true }) virtualScroll: IonVirtualScroll;

  public listadoPanel: any[] = [];
  public searchText: string = '';
  motos: motos[];
  cantidad: number;

  constructor(private api: ApiService, private ui: UiService, private alertas: AlertasService) {

  }

  ionViewDidEnter() {
    this.loadAll();
  }

  ngOnInit() {
    this.api.getTodasMotos().subscribe(res => {
      this.motos = res
      this.cantidad = this.motos.length;
    });
  }



  public doRefresh(e: any) {
    this.loadAll();
    e.target.complete();
  }

  public async loadAll() {
    await this.ui.presentLoading();
    try {
      await this.api.getTodasMotos().subscribe(res => {
        this.motos = res
        this.cantidad = this.motos.length;
      });
      await this.ui.hideLoading();
    } catch (err) {
      this.motos = null;
      await this.ui.showToast(err.error, 2000, 'danger');
      await this.ui.hideLoading();

    }

  }

  public async nuevaMoto() {
    const itemToBeCreated = await this.ui.showModal(FormPage);
    console.log(itemToBeCreated);
    try {
      if (itemToBeCreated.data) {
        await this.ui.presentLoading();
        await this.api.addMoto(itemToBeCreated.data);
        await this.loadAll();
        await this.ui.showToast('Nueva moto agregada correctamente', 2000, 'success', 'top');
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast('¡Ups, parece que hubo algún problema! Disculpa.', 2000, 'danger', 'middle');
      console.log(err.error)
    }
  }

  public async editaMoto(moto: motos) {
    const itemToBeUpdated = await this.ui.showModal(FormPage, moto);
    try {
      if (itemToBeUpdated.data) {
        await this.ui.presentLoading();
        await this.api.updateMoto(itemToBeUpdated.data, moto.id);
        await this.loadAll();
        await this.ui.showToast('¡Editado correctamente!', 2000, 'success', 'bottom');
      }
      
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast('¡Ups, parece que hubo algún problema! Disculpa.', 2000, 'danger', 'middle');
      console.log(err.error)
    }
  }

  public async borraMoto(moto: motos) {
    await this.ui.presentLoading();
    this.api
      .removeMoto(moto.id)
      .then(async d => await this.loadAll())
      .catch(async err => {
        await this.ui.showToast('¡Ups, parece que hubo algún problema! Disculpa.', 2000, 'danger', 'middle');
        console.log(err.error)
      })
      .finally(async () => {
        await this.ui.showToast('¡Borrado correctamente!', 2000, 'success', 'bottom');
        await this.ui.hideLoading();
        
      })
  }

  public buscaMoto(event: any) {
    this.searchText = event.detail.value;
    if(this.searchText===''||this.searchText==null){
      this.loadAll();
    }else{
      let motosBuscadas = [];
      motosBuscadas = this.filtrado(this.motos, this.searchText);
      this.motos = [];
      this.motos = motosBuscadas; 
    }
  }

  private filtrado(array: any[], searchText: string): any[] {
    if (searchText === '') {      
      return array;
    } else {
      return array.filter(valor => {
        return valor.marca.includes(searchText);
      })
    }
  }

}
