import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, take } from 'rxjs';
import { product } from '../../models/product';
import { shoppingCart } from '../../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(
    private aFireDateBase: AngularFireDatabase
  ){ }

  //=> Get The Big Cart That Contain All The Wanted Products After Find It Or Create It.
  async getCart() : Promise<Observable<shoppingCart>> {
    //: Get The Id Of The User
    let ShoppingCartId: string = await this.getOrCreateCartId();

    //: Get The Object The Represent The Cart Of This User That Hold His Wanted Product And Their Quantity
    let obsPrimitiveCart$ = this.aFireDateBase
      .object(`/shopping-carts/${ShoppingCartId}`)
      .valueChanges() as Observable<any>;

    //: Make The Object A Class For Add The Mechanism Of Calculating The Total Quantity
    return obsPrimitiveCart$.pipe(map(primitiveCart => {
      return new shoppingCart(primitiveCart?.items)
    }));
  }

  async addToCart(product: product){
    this.AddOrRemoveToCart(product, +1);
  }

  async removeFromCart(product: product){
    this.AddOrRemoveToCart(product, -1);
  }

  async AddOrRemoveToCart(product: product, wantedNumber: number){
    let shoppingCartId = await this.getOrCreateCartId();

    //=> Get An Object Reference For The Wanted Products To Check If We Have It Or Not.
    let itemObj = this.getItemObj(shoppingCartId, product.key);


    //=> Create An Obs From That Object Reference.
    let itemObjObs$ = itemObj.valueChanges();

    //=> Subscribe Once With The Obs Fr Check And Change The .
    itemObjObs$.pipe(take(1)).subscribe({
      next: ((responseItem: any) => {
        let comingQuantity : number = (responseItem?.quantity || 0) + wantedNumber;
        (comingQuantity == 0) ?
          this.deleteProductInCart(itemObj) :
          itemObj.update({ product: product , quantity: comingQuantity })
      })
    })
  }

  private async getOrCreateCartId() : Promise<string> {
    const shoppingCartId = localStorage.getItem('shoppingCartId');

    if (shoppingCartId)
      //: Return The Shopping Cart Project
      return shoppingCartId

    //=> Create A ShoppingCart
    let result = await this.createShoppingCart();
    //: Set The Value Of The shoppingCartId In The LocalStorage To The Key Of The Firebase Obj
    localStorage.setItem('shoppingCartId', result.key as string);
    //: Return The Shopping Cart Project
    return result.key as string;

  }

    //=> Get The item Obj From The Firebase If It's Exist.
    private getItemObj(shoppingCartId: string, productKey: string){
      return this.aFireDateBase.object(`/shopping-carts/${shoppingCartId}/items/${productKey}`);
    }

  async deleteCart(){
    let shoppingCartId = await this.getOrCreateCartId();
    //=> Delete All The Cart.
    return this.aFireDateBase.object(`/shopping-carts/${shoppingCartId}/items`).remove();
  }

  deleteProductInCart(itemObj: any){
    //=> Delete Specific Obj For A Specific Product That His Current Quantity Is 0.
    return itemObj.remove();
  }

  //=> Create A Shopping Cart If The Current User Doesn't Have One.
  private createShoppingCart(){
    return this.aFireDateBase.list('/shopping-carts').push({
      createDataTime: new Date().getTime()
    }).get();
  }

}


