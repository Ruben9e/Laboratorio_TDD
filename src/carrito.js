// Laboratorio TDD: carrito de compras
export class Carrito {
    constructor() {
        this.productos = [];
    }

    agregar(nombre, precio, cantidad = 1) {
        if (typeof precio !== 'number' || !Number.isFinite(precio) || precio <= 0) {
            throw new Error('El precio debe ser mayor que cero');
        }

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            throw new Error('La cantidad debe ser un entero positivo');
        }

        const existente = this.productos.find((producto) => producto.nombre === nombre);

        if (existente) {
            existente.cantidad += cantidad;
        } else {
            this.productos.push({ nombre, precio, cantidad });
        }
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
