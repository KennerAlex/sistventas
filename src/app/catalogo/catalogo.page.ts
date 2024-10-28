import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../models/producto.model';
import { ProductosService } from '../services/productos.service';
import { ItemCarritoModel } from '../models/item-carrito.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  productos : ProductoModel[] | undefined;
  quantity : number;


  constructor(
    private productosService : ProductosService

  ) {
    this.quantity=1;
  }

  ngOnInit() {
    this.productosService.ObtenerTodos().subscribe((resp:any)=> {
      this.productos = resp;
    })
  }
  addCarrito(producto: any) {
    let iCarrito: ItemCarritoModel = {
      idProducto: producto.idProducto,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad: 1,
    };

    if (localStorage.getItem("carrito") === null) {
      let carrito: ItemCarritoModel[] = [];
      carrito.push(iCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      let carritoStorage = localStorage.getItem("carrito") as string;
      let carrito = carritoStorage ? JSON.parse(carritoStorage) : [];
      console.log(carrito);
      let index = -1;
      for (let i = 0; i < carrito.length; i++) {
        let filaC: ItemCarritoModel = carrito[i];
        if (iCarrito.idProducto === filaC.idProducto) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        carrito.push(iCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        let itemcarrito: ItemCarritoModel = carrito[index];
        itemcarrito.cantidad!++;
        carrito[index] = itemcarrito;
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
    }
  }
}
