import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  edit=false;
  registrarForm : FormGroup;
  datos={

  email:'',
  password:''
  }
  createFormGroup(){
    return new FormGroup({
    password: new
    FormControl('',[Validators.required,Validators.minLength(6)]),
    email: new FormControl('',[Validators.required,
    Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9*-]+.[a-zAZ]{2,4}$")])
    });
    }


    constructor(private service:AuthService,
    private modalCtrl:ModalController,
    public formBuilder:FormBuilder
    ) {
    this.registrarForm=this.createFormGroup();
    }
    validation_messages = {
      'password': [
      { type: 'required', message: 'Escriba password.' },
      { type: 'minlength', message: 'Nombre maximo de 6 caracteres' }
      ],
      'email': [
      { type: 'required', message: 'Escribir correo' },
      { type: 'pattern', message: 'No es un formato de correo' }
      ],
    }

  ngOnInit() {
  }
  cerrarModal(){
    this.modalCtrl.dismiss(null,'cerrado');
    }

    onSubmit(){
      if(this.edit)
      {
      /*
      this.service.Actualizar(this.cliente,this.cliente.cliente_id).subscribe(()=>
      {
      this.cliente.cliente_id=this.cliente.cliente_id;
      this.modalCtrl.dismiss(this.cliente,'editado');
      });*/
      }
      else
      {
      const cliente=this.registrarForm.value;
      this.service.Agregar(cliente).subscribe(response=>
      {
      this.modalCtrl.dismiss(response,'creado');
      console.log(response);
      });
      }
      }

}
