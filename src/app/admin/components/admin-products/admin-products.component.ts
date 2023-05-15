import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import '@angular/localize/init';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products/products.service';

//=> New Imports:
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

//=> New Imports:
import { DecimalPipe, NgFor } from '@angular/common';
import { Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

//=> New Types:
export type SortColumn = keyof product | '';
export type SortDirection = 'asc' | 'desc' | '';

//=> New Variables:
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

//=> New Interface:
export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

//=> New Directive:
@Directive({
	selector: 'th[sortable]',
	standalone: true,
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})

//=> New Class
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}


@Component({
  selector: 'admin-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    //=> New Imports:
    DecimalPipe,
    NgFor,
    NgbdSortableHeader,

    //=> New Import:
    NgbTypeaheadModule,
    NgbPaginationModule
  ],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  allExistingProducts!: product[];
  filteredProducts!: product[];
  obsSubscription: Subscription;
  @ViewChildren(NgbdSortableHeader) headers?: QueryList<NgbdSortableHeader>;
  page = 1;
	pageSize = 4;
	collectionSize!: number;
  filteredProductsAndPagination!: product[];

  constructor (
    private productsService: ProductsService,
  ){

  this.obsSubscription = this.productsService.getAllProducts()
    .subscribe(response => {
      this.filteredProductsAndPagination = this.filteredProducts = this.allExistingProducts = response as product[];
      this.refreshCountries();
    });

  }

  filter(currentValue: string){
    //=> Filter The Table Dependent On The Value Of Search:
    this.filteredProducts = this.filteredProductsAndPagination = (currentValue) ?

      //: If We Have A Value In The Input Search
      this.allExistingProducts.filter((product: {title: string}) => product.title.toLowerCase().includes(currentValue.toLowerCase())) :

      //: If We Don't Have A Value In The Input Search
      this.allExistingProducts;
  }

	onSort({ column, direction }: SortEvent) {
		//=> resetting other headers
		this.headers?.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		//=> sorting countries
		if (direction === '' || column === '') {
			this.filteredProductsAndPagination = this.filteredProductsAndPagination;
		} else {
			this.filteredProductsAndPagination = [...this.filteredProductsAndPagination].sort((a, b) => {
				const res = compare(a[column], b[column]);
				return direction === 'asc' ? res : -res;
			});
		}
	}

	refreshCountries() {
    if (this.filteredProductsAndPagination){
      this.collectionSize = this.filteredProducts.length
      this.filteredProductsAndPagination = this.filteredProducts.map((country) => ({ ...country })).slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize,
      );
    }
  }

  ngOnDestroy(): void {
    this.obsSubscription.unsubscribe();
  }

}

