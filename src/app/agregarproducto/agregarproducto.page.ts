import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {
  edit = false;
  @Input() producto: any;
  categorias: any[] = [];
  datos = {
    descripcion: '',
    idCategoriaProducto: '',
    precio: '',
    cantidad: '',
  };
  createFormGroup() {
    return new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      idcategoria: new FormControl(null, [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
    });
  }

  validation_messages = {
    descripcion: [{ type: 'required', message: 'Escriba Nombre.' }],
    idcategoria: [{ type: 'required', message: 'Seleccione categoria' }],
    precio: [{ type: 'required', message: 'Escriba precio' }],
    cantidad: [{ type: 'required', message: 'Escriba cantidad' }],
  };

  registrarForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private serviceproducto: ProductosService,
    private servicecategoria: CategoriaService,
    public formBuilder: FormBuilder,
    private toastCtrl : ToastController
  ) {
    this.registrarForm = this.createFormGroup();
  }
  ngOnInit() {
    if (this.producto) {
      this.edit = true;
      this.datos = this.producto;
    }
    this.servicecategoria.ObtenerTodos().subscribe((response) => {
      this.categorias = response;
    });
  }
  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }
  onSubmit() {
    if (this.edit) {
      this.serviceproducto.Actualizar(this.producto,this.producto.idProducto).subscribe(()=>
        {
        this.producto.idProducto=this.producto.idProducto;
        this.modalCtrl.dismiss(this.producto,'editado');
        });
    } else {
      const producto = this.registrarForm.value;
      console.log(producto);
      this.serviceproducto.Agregar(producto).subscribe((response:any) => {
        this.modalCtrl.dismiss(response, 'creado');
        console.log(response);
      });
    }
  }
}
