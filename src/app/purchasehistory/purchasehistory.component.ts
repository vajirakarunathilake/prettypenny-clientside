import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product';
import { Purchase } from '../products/purchase';
import { Helpers } from '../helpers';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-purchasehistory',
  templateUrl: './purchasehistory.component.html',
  styleUrls: ['./purchasehistory.component.scss']
})
export class PurchasehistoryComponent implements OnInit {

  constructor(public helper: Helpers, private purchaseService: PurchaseService) { }
  myPurchases: Purchase[] = [];
  allPurchases: Purchase[] = [];

  getPurchases() {
    this.purchaseService.findAll().subscribe(
      (p) => {
        this.allPurchases = p as Purchase[];
        for (const purchase of this.allPurchases) {
          if (purchase.user.userId === +this.helper.localStorageItem('userId')) {
            this.myPurchases.push(purchase);
          }
        }
      }
    );
  }


  ngOnInit() {
    this.getPurchases();
  }

}
