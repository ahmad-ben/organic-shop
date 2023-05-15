import { product } from './product';
export class shoppingCartItem{
  constructor (public product: product, public quantity: number) {}

  get totalPrice(){
    return this.product.price * this.quantity
  }

}