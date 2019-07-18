import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../products/product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(products: Product[], filterBy: string): any {
    if (filterBy === 'all') {
      return products;
    } else {
      return products.filter(product => {
        return product.taxonomy.type === filterBy
        || product.taxonomy.name === filterBy
        || product.taxonomy.subType === filterBy
        || product.status === filterBy;
      });
    }
  }
}
