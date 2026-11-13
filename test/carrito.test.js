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
});
