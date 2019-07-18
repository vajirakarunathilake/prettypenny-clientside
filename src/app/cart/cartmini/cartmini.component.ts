import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../products/product';
import { ProductService } from '../../services/product.service';
import { Interest } from 'src/app/products/interest';


@Component({
  selector: 'app-cartmini',
  templateUrl: './cartmini.component.html',
  styleUrls: ['./cartmini.component.scss']
})
export class CartminiComponent implements OnInit, OnDestroy {
  cartMiniItems: Interest[];
  cartminiTotal: number;
  cartAdditionSubscription: Subscription;
  cartTotalSubscription: Subscription;

  constructor(private prodService: ProductService) {}

  ngOnInit() {
    this.cartMiniItems = this.prodService.getCartAddedItems();
    this.cartAdditionSubscription = this.prodService.cartAdditionEmitter.subscribe(
      (interests: Interest[]) => {
        this.cartMiniItems = interests;
      }
    );
    this.cartminiTotal = this.prodService.getCartTotal();
    this.cartTotalSubscription = this.prodService.cartTotalEmitter.subscribe(
      (cTotal: number) => {
        this.cartminiTotal = cTotal;
      }
    );
  }



  removeCartProduct(itemIndex: number) {
    this.prodService.removeCartSingleItem(itemIndex);
  }

  emptyCart() {
    this.prodService.emptyCart();
  }



  ngOnDestroy() {
    this.cartAdditionSubscription.unsubscribe();
    this.cartTotalSubscription.unsubscribe();
  }



}
