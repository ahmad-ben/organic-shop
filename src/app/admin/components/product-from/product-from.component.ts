import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { CategoryService } from 'src/app/shared/services/categories/category.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';


@Component({
  selector: 'product-from',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent
  ],
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.css']
})
export class ProductFromComponent {
  categories$!: any;
  product: any = {};
  productId: string | null;

  constructor (
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    categoryService: CategoryService
  ){
    this.categories$ = categoryService.getAllCategories();
    this.productId = route.snapshot.paramMap.get('id');
    if(this.productId)
      this.productsService.getProduct(this.productId).pipe(take(1)).subscribe(p=> this.product = p);
  }

  save(productInfo: any){
    if(this.productId) this.productsService.updateProduct(this.productId, productInfo);
    else this.productsService.addProduct(productInfo);
    this.router.navigate(['/admin/products']);
  }

  deleteProduct(productUID: any){
    this.productsService.deleteProduct(productUID);
    this.router.navigate(['/admin/products']);
  }

}
