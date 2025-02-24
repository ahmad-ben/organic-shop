import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { OrderInfo } from '../../../shared/models/order-info';
import { OrderService } from '../../../shared/services/order/order.service';

@Component({
  selector: 'admin-order-info',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './admin-order-info.component.html',
  styleUrls: ['./admin-order-info.component.css']
})
export class AdminOrderInfoComponent {
  allOrders$!: Observable<OrderInfo[]>;
  wantedOrder$!: Observable<OrderInfo>;

  OrderById$!: Observable<OrderInfo>;
  userId!: string;
  userSubscription!: Subscription;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ){

    this.wantedOrder$ = orderService.getAllOrders().pipe(
      map<OrderInfo[], OrderInfo>((allIdOrders: any[]) => {
        let routeOrderIndex = this.route.snapshot.paramMap.get('index') as string;
        return allIdOrders.find ( (order, orderIndex) => (routeOrderIndex == orderIndex.toString()) )
      }),
    )

  }
}
