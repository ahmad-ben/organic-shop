import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { OrderInfo } from '../../../shared/models/order-info';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'my-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  OrdersById$!: Observable<OrderInfo[]>;
  userId!: string;
  userSubscription!: Subscription;

  constructor(
    private orderService: OrderService,
  ){

    this.OrdersById$ = this.orderService.getOrdersById()

  }
}
