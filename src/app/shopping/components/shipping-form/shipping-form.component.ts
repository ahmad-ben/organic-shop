import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderInfo } from '../../../shared/models/order-info';
import { shoppingCart } from '../../../shared/models/shopping-cart';
import { AuthFirebaseService } from '../../../shared/services/auth/auth-firebase.service';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'shipping-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnDestroy{
  buyerInfo: any = {};
  userId!: string;
  userSubscription!: Subscription;

  @Input('cart') cart!: shoppingCart;

  constructor(
    private orderService: OrderService,
    public authService: AuthFirebaseService,
    public router: Router,
  ){
    this.userSubscription = this.authService.useInfoFromFB$.subscribe(
      userInfo => this.userId = userInfo?.uid as string
    )
  }

  async saveOrderInfo(){
    let newOrderInfo = new OrderInfo(
      this.userId,
      this.buyerInfo,
      this.cart
    )

    let processResult = await this.orderService.palaceOrder(newOrderInfo);

    this.router.navigate(['/order-success', processResult.key])
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
