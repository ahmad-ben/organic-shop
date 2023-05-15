import { shoppingCart } from "./shopping-cart";

export class OrderInfo{
  datePlaced: number;
  shippingInfo!: any[];

  constructor (
    public userId: string,
    public userInfo: any,
    cart: shoppingCart,
  ){
    this.datePlaced = new Date().getTime();

    this.shippingInfo = cart.productsInfoArr.map((productInfo) => {
      return {
        productInfo: {
          title: productInfo.product.title,
          imageUrl: productInfo.product.imageUrl,
          price: productInfo.product.price,
          quantity: productInfo.quantity,
          totalPrice: productInfo.totalPrice
        }
      }
    })
  }

}














