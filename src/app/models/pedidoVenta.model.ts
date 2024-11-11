import { ProductoModel } from "./producto.model";

export interface PedidoVentaModel {
  idPedidoVenta?: number,
  idCliente: number,
  codigo?:string,
  correlativo? :number,
  idFormaPago: string,
  idMoneda:string,
  fechaEmision:string,
  total:number,
  productos: detallePedidoVenta[]
  }

  export interface detallePedidoVenta{
    idDetallePedidoVenta : number,
    idProducto: number,
    cantidad:number,
    descripcionProducto:string,
    precioProducto :number,
    subTotal:number,
  }


