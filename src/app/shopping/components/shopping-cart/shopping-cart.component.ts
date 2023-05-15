import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductQuantityComponent } from '../../../shared/components/product-quantity/product-quantity.component';
import { shoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductQuantityComponent
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$!: Observable<shoppingCart>;
  constructor (
    private shoppingCartSer: ShoppingCartService
  ){}

  async ngOnInit(){
    this.cart$ = await this.shoppingCartSer.getCart();
  }

  deleteCart(){
    this.shoppingCartSer.deleteCart();
  }
}
