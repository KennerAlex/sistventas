import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AgregarproductoPage } from '../agregarproducto/agregarproducto.page';
import { ProductoModel } from '../models/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  productos: any = [];
  constructor(
    private service: ProductosService,
    private modalCtrl: ModalController,
    private toastCtrl : ToastController,
    private alertCtrl:AlertController

  ) {}
  ngOnInit() {
    this.service.ObtenerTodos().subscribe((response) => {
      this.productos = response;
    });
  }
  Agregar() {

    //this.router.navigate(['/agregar-clientes']);
    this.modalCtrl
      .create({
        component: AgregarproductoPage,
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        if (role === 'creado') {

              this.presentToast('Correcto! Se guardo!','top','success');
          this.service.ObtenerTodos().subscribe((response) => {
            this.productos = response;

          });
        }else{
          this.presentToast('Error!','top','danger');

        }
      });
  }

  editar(producto: ProductoModel) {
    console.log(producto);
    this.modalCtrl
      .create({
        component: AgregarproductoPage,
        componentProps: { producto },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        this.productos = this.productos.filter((std:any) => {
          if (data.idProducto === std.idProducto) {
            this.presentToast('Correcto! Se actualizo','top','success');
            return data;
          }
          return std;
        });
      });
  }
  eliminar(idProductor: number) {
    this.alertCtrl
      .create({
        header: 'Borrar',
        message: 'Esta seguro de eliminar?' + idProductor,
        buttons: [
          {
            text: 'SI',
            handler: () => {
              this.service.Borrar(idProductor).subscribe(() => {
                // this.productos = this.productos!.filter(
                //   (std:any) => std.idProductor !== idProductor
                // );
                this.service.ObtenerTodos().subscribe((response) => {
                  this.productos = response;
                });
              });
            },
          },
          { text: 'NO' },
        ],
      })
      .then((alertEl) => alertEl.present());
  }
  async presentToast(mensaje:string ,position: 'top' | 'middle' | 'bottom',color: 'success'| 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500,
      position: position,
      color: color
    });

    await toast.present();
  }
}
