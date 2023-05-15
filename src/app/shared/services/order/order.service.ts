import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, switchMap } from 'rxjs';
import { OrderInfo } from 'src/app/shared/models/order-info';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart/shopping-cart.service';
import { AuthFirebaseService } from '../auth/auth-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private aFireDateBase: AngularFireDatabase,
    private shoppingCartSer: ShoppingCartService,
    public authService: AuthFirebaseService,
  ){}

  async palaceOrder(orderInfo: any) {
    let processResult = await this.aFireDateBase.list('/orders').push(orderInfo).get();
    this.shoppingCartSer.deleteCart();
    return processResult;
  }

  getAllOrders() {
    return this.aFireDateBase.list('/orders').valueChanges() as Observable<OrderInfo[]>;
  }

  getOrdersById() {
    return this.authService.useInfoFromFB$.pipe(
      switchMap((authResponse) => {
        return this.aFireDateBase.list('/orders', ref =>
          ref.orderByChild('userId').equalTo(authResponse?.uid as string)
        ).valueChanges() as Observable<OrderInfo[]>;
      })
    )
  }

}
