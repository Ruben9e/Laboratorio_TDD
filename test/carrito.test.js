import { describe, test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Carrito } from '../src/carrito.js';

describe('Carrito de compras', () => {
  let carrito;

  beforeEach(() => {
    carrito = new Carrito();
  });

  describe('Iteración 1: carrito vacío', () => {
    test('un carrito nuevo no tiene ítems', () => {
      assert.equal(carrito.cantidadDeItems(), 0);
    });

    test('un carrito nuevo tiene subtotal 0', () => {
      assert.equal(carrito.subtotal(), 0);
    });
  });

  describe('Iteración 2: agregar productos', () => {
    test('agregar un producto actualiza cantidad y subtotal', () => {
      carrito.agregar('Mouse', 50000, 2);

      assert.equal(carrito.cantidadDeItems(), 2);
      assert.equal(carrito.subtotal(), 100000);
    });

    test('agregar varios productos suma todos los subtotales', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.agregar('Teclado', 120000, 1);

      assert.equal(carrito.cantidadDeItems(), 3);
      assert.equal(carrito.subtotal(), 220000);
    });

    test('si no se indica cantidad, se agrega una unidad', () => {
      carrito.agregar('Audífonos', 80000);

      assert.equal(carrito.cantidadDeItems(), 1);
    });
  });

  describe('Iteración 3: producto repetido', () => {
    test('agregar el mismo producto acumula la cantidad en una sola línea', () => {
      carrito.agregar('Mouse', 50000, 1);
      carrito.agregar('Mouse', 50000, 2);

      assert.equal(carrito.productos.length, 1);
      assert.equal(carrito.cantidadDeItems(), 3);
      assert.equal(carrito.subtotal(), 150000);
    });
  });

  describe('Iteración 4: validaciones', () => {
    test('no permite precios negativos o en cero', () => {
      assert.throws(() => carrito.agregar('Mouse', -100, 1), /precio/);
      assert.throws(() => carrito.agregar('Mouse', 0, 1), /precio/);
    });

    test('no permite cantidades en cero, negativas o decimales', () => {
      assert.throws(() => carrito.agregar('Mouse', 50000, 0), /cantidad/);
      assert.throws(() => carrito.agregar('Mouse', 50000, -1), /cantidad/);
      assert.throws(() => carrito.agregar('Mouse', 50000, 1.5), /cantidad/);
    });
  });

  describe('Iteración 5: eliminar productos', () => {
    test('eliminar un producto lo quita del carrito', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.agregar('Teclado', 120000, 1);

      carrito.eliminar('Mouse');

      assert.equal(carrito.cantidadDeItems(), 1);
      assert.equal(carrito.subtotal(), 120000);
    });

    test('eliminar un producto que no existe lanza un error', () => {
      assert.throws(() => carrito.eliminar('Monitor'), /no está en el carrito/);
    });
  });

  describe('Iteración 6: cupones de descuento', () => {
    test('sin cupón el descuento es 0', () => {
      carrito.agregar('Teclado', 200000, 1);

      assert.equal(carrito.descuento(), 0);
    });

    test('el cupón DESC10 descuenta el 10 % del subtotal', () => {
      carrito.agregar('Teclado', 200000, 1);
      carrito.aplicarCupon('DESC10');

      assert.equal(carrito.descuento(), 20000);
    });

    test('el cupón DESC20 descuenta el 20 % del subtotal', () => {
      carrito.agregar('Teclado', 200000, 1);
      carrito.aplicarCupon('DESC20');

      assert.equal(carrito.descuento(), 40000);
    });

    test('un cupón inexistente lanza un error', () => {
      assert.throws(() => carrito.aplicarCupon('GRATIS'), /no es válido/);
    });
  });

  describe('Iteración 7: IVA y total a pagar', () => {
    test('el IVA es el 19 % del subtotal cuando no hay cupón', () => {
      carrito.agregar('Mouse', 50000, 2);

      assert.equal(carrito.iva(), 19000);
      assert.equal(carrito.total(), 119000);
    });

    test('el IVA se calcula sobre el valor con descuento', () => {
      carrito.agregar('Mouse', 50000, 2);
      carrito.aplicarCupon('DESC10');

      assert.equal(carrito.iva(), 17100);
      assert.equal(carrito.total(), 107100);
    });

    test('un carrito vacío tiene total 0', () => {
      assert.equal(carrito.total(), 0);
    });
  });
});
