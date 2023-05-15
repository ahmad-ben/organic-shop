import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { ProductQuantityComponent } from '../product-quantity/product-quantity.component';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [
    CommonModule,
    ProductQuantityComponent
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']

})
export class ProductCardComponent {
  @Input('product') product!: product;
  @Input('addToCart') addToCart: boolean = true;
  @Input('shopping-cart') shoppingCart: any;

  constructor (
    private shoppingCartSer: ShoppingCartService
  ){}

  addToCartFun(){
    this.shoppingCartSer.addToCart(this.product)
  }

}
