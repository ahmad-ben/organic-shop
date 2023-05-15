import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { shoppingCart } from '../../../../shared/models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart!: shoppingCart;
}
