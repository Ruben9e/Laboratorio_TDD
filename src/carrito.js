// Laboratorio TDD: carrito de compras
export class Carrito {
    constructor() {
        this.productos = [];
    }

    agregar(nombre, precio, cantidad = 1) {
        this.productos.push({ nombre, precio, cantidad });
    }

    cantidadDeItems() {
        return this.productos.reduce((total, producto) => total + producto.cantidad, 0);
    }

    subtotal() {
        return this.productos.reduce(
            (total, producto) => total + producto.precio * producto.cantidad,
            0
        );
    }
}
