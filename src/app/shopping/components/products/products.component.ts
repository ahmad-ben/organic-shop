import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, switchMap } from 'rxjs';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { product } from '../../../shared/models/product';
import { shoppingCart } from '../../../shared/models/shopping-cart';
import { ProductsService } from '../../../shared/services/products/products.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart/shopping-cart.service';
import { ProductsFilterComponent } from './products-filter/products-filter.component';


@Component({
  selector: 'products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    ProductsFilterComponent,
    ProductCardComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: product[];
  filteredProducts!: product[];
  currentCategory!: string;
  shoppingCart$!: Observable<shoppingCart>;
  constructor (
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private shoppingCartSer: ShoppingCartService,
  ){}

  async ngOnInit() {
    this.shoppingCart$ = await this.shoppingCartSer.getCart();

    this.populateProducts();
  }

  private populateProducts(){
    //=> The First Obs For Get All The Products.
    this.productsService.getAllProducts().pipe(

      //: Change The First Obs After Get The Products To Other Obs.
      switchMap((productsResponse) => {

        //:: Set The Arrays To The Generic Response.
        this.filteredProducts = this.products = productsResponse as product[];

        //:: Change The Obs To The Route Obs For Track The QueryParams Each Time They Change.
        return this.route.queryParams
      })
    )
    //=> Subscribe To The Obs 'The Second One -switchMap Effect-'
    .subscribe({
      next: ( (responseParams: Params) => {

        //: Logic Of Set The Current Category.
        this.currentCategory = responseParams['category'];

        //: Condition Of Set The Filtered Array From The Main One.
        this.applyFilter();
      })
    })
  }

  private applyFilter(){
    this.filteredProducts = (!this.currentCategory) ?
    this.products :
    this.products?.filter((product) => product.category == this.currentCategory);
  }
}
