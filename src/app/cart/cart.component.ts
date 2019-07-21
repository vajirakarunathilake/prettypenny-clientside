import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Interest } from '../products/interest';
import { Purchase } from '../products/purchase';
import { InterestService } from '../services/interest.service';
import { ProductService } from '../services/product.service';
import { PurchaseService } from '../services/purchase.service';
import { User } from '../user';
import { Helpers } from '../helpers';


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

  constructor(
    private interestService: InterestService,
    private purchaseService: PurchaseService,
    private prodService: ProductService,
    public helper: Helpers
  ) { }

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


  onValAdd(interest: Interest) {
    this.prodService.cartProductManipulate(interest, true);
  }
  onValSub(interest: Interest) {
    this.prodService.cartProductManipulate(interest);
  }


  removeCartProduct(itemIndex: number) {
    this.prodService.removeCartSingleItem(itemIndex);
  }

  emptyCart() {
    this.prodService.emptyCart();
  }

  onCheckout() {

    this.cartItems.forEach(item => {
      const interest = item;
      interest.product.dateListed = null;
      console.log(item);

      if (interest.product.status === 'Pretty') {
        const purchase = new Purchase();
        purchase.user = new User();
        purchase.user.userId = +this.helper.localStorageItem('userId');
        purchase.product = interest.product;
        purchase.cost = interest.product.price * interest.quantity;
        this.purchaseService.insert(purchase).subscribe();
        this.interestService.insert(interest).subscribe();
      } else {
        this.interestService.insert(interest).subscribe();
      }

    });

    alert(`Total: ${this.cartTotal}. Your card information has been processed.\n\nThank you for shopping with Pretty Penny!`);
    this.emptyCart();
  }


  ngOnDestroy() {
    this.cartAdditionSubscription.unsubscribe();
    this.cartTotalSubscription.unsubscribe();
  }

}
