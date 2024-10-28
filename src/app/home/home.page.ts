import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarClientePage } from '../agregar-cliente/agregar-cliente.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  clientes: any[] = [];
  constructor(
    private router: Router,
    private service: ClienteService,
    private modalCtrl: ModalController,
    private alertCtrl:AlertController
  ) {}
  ngOnInit() {
    this.service.ObtenerTodos().subscribe((response) => {
      this.clientes = response;
    });
  }

  Agregar() {
    //this.router.navigate(['/agregar-clientes']);
    this.modalCtrl
      .create({
        component: AgregarClientePage,
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        if (role === 'creado') {
          this.service.ObtenerTodos().subscribe((response) => {
            this.clientes = response;
          });
        }
      });
  }
  editar(cliente: Cliente) {
    this.modalCtrl
      .create({
        component: AgregarClientePage,
        componentProps: { cliente },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        this.clientes = this.clientes.filter((std) => {
          if (data.id === std.cliente_id) {
            return data;
          }
          return std;
        });
      });
  }
  eliminar(cliente_id: number) {
    this.alertCtrl
      .create({
        header: 'Borrar',
        message: 'Esta seguro de eliminar?' + cliente_id,
        buttons: [
          {
            text: 'SI',
            handler: () => {
              this.service.Borrar(cliente_id).subscribe(() => {
                this.clientes = this.clientes!.filter(
                  (std) => std.cliente_id !== cliente_id
                );
              });
            },
          },
          { text: 'NO' },
        ],
      })
      .then((alertEl) => alertEl.present());
  }
}
