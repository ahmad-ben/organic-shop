import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/categories/category.service';

@Component({
  selector: 'products-filter',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent {
  categories$: Observable<any[]>;
  @Input('category') currentCategory : any;

  constructor(
    categoryService: CategoryService
  ){
    this.categories$ = categoryService.getAllCategories();
  }
}
