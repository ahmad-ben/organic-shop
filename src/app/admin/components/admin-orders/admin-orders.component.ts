import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderInfo } from 'src/app/shared/models/order-info';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'admin-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  allOrders$!: Observable<OrderInfo[]>;

  constructor(
    private orderService: OrderService,
  ){
    this.allOrders$ = orderService.getAllOrders();
  }


}
