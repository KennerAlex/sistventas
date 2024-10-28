import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria, CategoriaService } from '../services/categoria.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarCategoriaPage } from '../agregar-categoria/agregar-categoria.page';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  categorias: any[] = [];

  constructor(
    private router: Router,
    private service: CategoriaService,
    private modalCtrl: ModalController,
    private alertCtrl:AlertController
  ) { }

  ngOnInit() {
    this.service.ObtenerTodos().subscribe((response) => {
      this.categorias = response;
    });
  }

  Agregar() {
    //this.router.navigate(['/agregar-clientes']);
    this.modalCtrl
      .create({
        component: AgregarCategoriaPage,
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        if (role === 'creado') {
          this.service.ObtenerTodos().subscribe((response) => {
            this.categorias = response;
          });
        }
      });
  }
  editar(categoria: Categoria) {
    this.modalCtrl
      .create({
        component: AgregarCategoriaPage,
        componentProps: { categoria },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(({ data, role }) => {
        this.categorias = this.categorias.filter((std) => {
          if (data.idCategoriaProducto === std.idCategoriaProducto) {
            return data;
          }
          return std;
        });
      });
  }
  eliminar(idCategoriaProducto: number) {
    this.alertCtrl
      .create({
        header: 'Borrar',
        message: 'Esta seguro de eliminar?' + idCategoriaProducto,
        buttons: [
          {
            text: 'SI',
            handler: () => {
              this.service.Borrar(idCategoriaProducto).subscribe(() => {
                this.categorias = this.categorias!.filter(
                  (std) => std.idCategoriaProducto !== idCategoriaProducto
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
