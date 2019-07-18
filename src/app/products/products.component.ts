import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from './product';
import { TaxonomyService } from '../services/taxonomy.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filterBy: string;
  searchText: string;
  layoutMode: boolean; // true for grid, false for list
  isLoading = true;

  constructor(
    private prodService: ProductService,
    private taxService: TaxonomyService
    ) {}

  ngOnInit() {
    this.prodService.findAll().subscribe(
      products => {
        products.forEach(product => {
          this.taxService.findById(product.taxonomy.taxonomyId).subscribe(
            taxonomy => {
              product.taxonomy = taxonomy;
            }
          );
        });
        this.prodService.setAllProducts(products);
        this.products = this.prodService.getAllProducts();
      },
      err => console.log(err),
      () => this.isLoading = false
    );



    this.filterBy = this.prodService.getFilter();
    this.searchText = this.prodService.getSearchFilter();
    this.layoutMode = this.prodService.getLayout();

    this.prodService.filterTypeEmitter.subscribe(
      (filterValue: string) => {
        this.filterBy = filterValue;
      }
    );
    this.prodService.searchEmitter.subscribe(
      (searchValue: string) => {
        this.searchText = searchValue;
      }
    );
    this.prodService.layoutModeEmitter.subscribe(
      (layoutVal: boolean) => {
        this.layoutMode = layoutVal;
      }
    );
  }

  ngOnDestroy() {
    this.products = [];
  }

}
