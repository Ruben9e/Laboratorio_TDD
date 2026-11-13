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
});
