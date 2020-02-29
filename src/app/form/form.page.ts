import { Component, OnInit, Input } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { motos } from '../model/motos.interface';
import { ModalController } from '@ionic/angular';
import { FotoService } from '../services/foto.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  @Input() id: string;
  @Input() cilindrada: number;
  @Input() color: string;
  @Input() marca: string;
  @Input() modelo: string;
  @Input() tipo: string;
  @Input() imagen: string;

  public mode: string;
  public form: FormGroup;

  constructor(private modal: ModalController,
    private formBuilder: FormBuilder,
    public fotoService: FotoService) {

  }

  ngOnInit() {
    let moto: motos = { id: this.id, cilindrada: this.cilindrada, color: this.color, marca: this.marca, modelo: this.modelo, tipo: this.tipo, imagen: this.imagen }
    // this.moto = navParams.get('motos');
    //console.log(this.user.id)
    if (moto && moto.id) {
      this.mode = 'Editando';
    } else {
      this.mode = 'Creando';
      moto = {
        cilindrada: null,
        color: '',
        marca: '',
        modelo: '',
        tipo: '',
        imagen: ''
      }
    }

    this.fotoService.setImagen(moto.imagen);
    this.form = this.formBuilder.group({
      cilindrada: new FormControl(
        moto.cilindrada,
        Validators.compose([Validators.required, Validators.maxLength(128)])
      ),
      color: new FormControl(
        moto.color,
        Validators.compose([Validators.required, Validators.maxLength(128)])
      ),
      marca: new FormControl(
        moto.marca,
        Validators.compose([Validators.required, Validators.maxLength(128)])
      ),
      modelo: new FormControl(
        moto.modelo,
        Validators.compose([Validators.required, Validators.maxLength(128)])
      ),
      tipo: new FormControl(
        moto.tipo,
        Validators.compose([Validators.required, Validators.maxLength(128)])
      ),
    })

  }

  submitForm() {
    this.dismiss(this.form.value);
  }

  public dismiss(moto: motos) {
    moto.imagen=this.fotoService.getImagen();
    this.fotoService.image = '';
    this.modal.dismiss(moto);

  }

  public takePhoto() {
    this.fotoService.takePhoto();
  }

  public choosePhoto(){
    this.fotoService.choosePhoto();
  }

}
