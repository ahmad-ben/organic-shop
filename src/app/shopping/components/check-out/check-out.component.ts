import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart/shopping-cart.service';
import { ShippingFormComponent } from '../shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

@Component({
  selector: 'check-out',
  standalone: true,
  imports: [
    CommonModule,
    ShippingFormComponent,
    ShoppingCartSummaryComponent
  ],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$!: Observable<shoppingCart>;

  constructor(
    private shoppingCartSer: ShoppingCartService,
  ){}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartSer.getCart();
  }

}
