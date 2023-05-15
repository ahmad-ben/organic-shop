import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product!: any;
  @Input('shopping-cart') shoppingCart: any;

  constructor (
    private shoppingCartSer: ShoppingCartService
  ){}

  addToCartFun(){
    this.shoppingCartSer.addToCart(this.product)
  }

  removeFromCartFun() {
    this.shoppingCartSer.removeFromCart(this.product)
  }

}
