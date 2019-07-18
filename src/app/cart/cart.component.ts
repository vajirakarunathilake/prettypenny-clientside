import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../products/product';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Interest } from '../products/interest';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Interest[];
  cartTotal: number;
  cartAdditionSubscription: Subscription;
  cartTotalSubscription: Subscription;

  constructor(private prodService: ProductService) {}

  ngOnInit() {
    this.cartItems = this.prodService.getCartAddedItems();
    this.cartAdditionSubscription = this.prodService.cartAdditionEmitter.subscribe(
      (interests: Interest[]) => {
        this.cartItems = interests;
      }
    );

    this.cartTotal = this.prodService.getCartTotal();
    this.cartTotalSubscription = this.prodService.cartTotalEmitter.subscribe(
      (cTotal: number) => {
        this.cartTotal = cTotal;
      }
    );
  }


  onValAdd(product: Product) {
    this.prodService.cartProductManipulate(product, 0, true);
  }
  onValSub(product: Product) {
    this.prodService.cartProductManipulate(product);
  }


  removeCartProduct(itemIndex: number) {
    this.prodService.removeCartSingleItem(itemIndex);
  }

  emptyCart() {
    this.prodService.emptyCart();
  }

  onCheckout() {

    alert(JSON.stringify(this.cartItems) + '\n\n\n' + 'Total: ' + this.cartTotal);
  }


  ngOnDestroy() {
    this.cartAdditionSubscription.unsubscribe();
    this.cartTotalSubscription.unsubscribe();
  }

}
