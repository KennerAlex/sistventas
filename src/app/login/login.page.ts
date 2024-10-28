import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AgregarPage } from '../agregar/agregar.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9*-]+.[a-zAZ]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }
  validation_messages = {
    email: [
      { type: 'required', message: 'Escribir correo' },
      { type: 'pattern', message: 'No es un formato de correo' },
    ],
    password: [{ type: 'required', message: 'Escriba su password' }],
  };
  constructor(
    private router: Router,
    private authService: AuthService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private service:AuthService,
    private modalCtrl:ModalController,
   
  ) {
    this.formLogin = this.createFormGroup();
  }
  ngOnInit() {}
  async iniciar() {
    let email = this.formLogin.value.email;
    this.authService.verificarEmail(email!).subscribe(
      async (response) => {
        if (response.data) {
          let user = this.formLogin.value.password;
          this.authService
            .verificarClave(email!, user!)
            .subscribe(async (resp) => {
              if (resp.data) {
                this.navCtrl.navigateRoot('home');
              } else {
                const alert = await this.alertController.create({
                  header: 'Error',
                  message: 'Password no Valido',
                  buttons: ['Aceptar'],
                });
                await alert.present();
              }
            });
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Correo no Valido',
            buttons: ['Aceptar'],
          });
          await alert.present();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  registrarse() {
    //this.router.navigate(['/agregar-clientes']);
    this.modalCtrl
      .create({
        component: AgregarPage,
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        if (role === 'creado') {
    
        }
      });
  }
}
