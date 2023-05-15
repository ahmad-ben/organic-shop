import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { OrderInfo } from '../../../shared/models/order-info';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'app-order-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent {
  OrderById$!: Observable<OrderInfo>;
  userId!: string;
  userSubscription!: Subscription;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ){

    this.OrderById$ = this.orderService.getOrdersById().pipe(
      map((allIdOrders: any[]) => {
        let routeOrderIndex = this.route.snapshot.paramMap.get('index') as string;
        return allIdOrders.find((order, orderIndex) => {
          return (routeOrderIndex == orderIndex.toString())
        })
      }),
    )

  }
}
