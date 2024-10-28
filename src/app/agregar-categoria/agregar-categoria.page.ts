import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../services/categoria.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.page.html',
  styleUrls: ['./agregar-categoria.page.scss'],
})
export class AgregarCategoriaPage implements OnInit {
  @Input() categoria: any ;
  edit = false;
  datos = {
    descripcion: '',
  };

  createFormGroup() {
    return new FormGroup({
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  validation_messages = {
    descripcion: [
      { type: 'required', message: 'Escriba el nombre de la categoria.' },
      { type: 'minlength', message: 'Nombre maximo de 5 caracteres' },
    ]
  };

  registrarForm: FormGroup;
  constructor(
    private service: CategoriaService,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.registrarForm = this.createFormGroup();
  }
  ngOnInit() {
    if (this.categoria) {
      this.edit = true;
      this.datos = this.categoria;
    }
  }
  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  onSubmit() {
    if (this.edit) {
    this.service.Actualizar(this.categoria,this.categoria.idCategoriaProducto).subscribe(()=>
    {
    this.categoria.idCategoriaProducto=this.categoria.idCategoriaProducto;
    this.modalCtrl.dismiss(this.categoria,'editado');
    });
    } else {
      const categoria = this.registrarForm.value;
      this.service.Agregar(categoria).subscribe((response) => {
        this.modalCtrl.dismiss(response, 'creado');
        console.log(response);
      });
    }
  }

}
