import Producto from "./producto.model";



interface Venta {
    ventaId: String;
    vendedorId: String;
    productos: Producto;
    valorTotal: number;
}

export default Venta; 