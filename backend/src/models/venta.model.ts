import Producto from "./producto.model";



interface Venta {
    ventaId: String;
    vendedorId: String;
    productos: Producto;
    stock: number;
    valorTotal: number;
}

export default Venta; 