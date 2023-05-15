import { product } from "./product";
import { shoppingCartItem } from "./shopping-cart-item";

export class shoppingCart{
  productsInfoArr: shoppingCartItem[] = [];

  constructor (
    private productsItems: { [productId: string]: shoppingCartItem }
  ) {

    for(let productId in this.productsItems) {
      let productInfo = this.productsItems[productId]
      this.productsInfoArr.push(this.shoppingCartItemIns(productInfo.product, productInfo.quantity))
    }
  }

  get totalPrice(){
    let sum : number = 0;
    for(let productId in this.productsItems) {
      let productInfo = this.productsItems[productId]
      let totalPrice = this.shoppingCartItemIns(productInfo.product, productInfo.quantity).totalPrice
      sum += totalPrice;
    }

    return sum;
  }

  get totalItemCount(){
    let totalQuantity = 0;
    for (let productId in this.productsItems) {
      totalQuantity += this.productsItems[productId].quantity;
    }

    return totalQuantity;
  }

  getQuantity(product: product) : number {

    if(!this.productsItems) return 0;
    let item = this.productsItems[product.key];
    return (item) ? item.quantity : 0;

  }

  private shoppingCartItemIns(product: product, quantity: number) {
    return new shoppingCartItem(product, quantity)
  }

}














