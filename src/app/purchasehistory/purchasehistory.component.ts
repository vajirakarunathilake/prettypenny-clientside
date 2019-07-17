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
  myPurchase: Purchase[];
  allPurchase: Purchase[];
  myStuff = '';
  getPurchases(){
    this.purchaseService.findAll().subscribe(
      (p) => {
        this.allPurchase = p;
      }
    );
  }

  getMyPurchases(){
    this.getPurchases();
    for (let i = 0; i < this.allPurchase.length; i++){
      if (localStorage.getItem('userId') === ('' + this.allPurchase[i].user.userId)){
        this.myPurchase.push(this.allPurchase[i]);
      }
    }
  }

  ngOnInit() {
    this.getMyPurchases();
    for (let i = 0; i < this.myPurchase.length; i++){
      this.myStuff = this.myStuff + `Purchase Date: ${this.myPurchase[i].datePurchased} <br> Product: ${this.myPurchase[i].product} <br>`;
    }
  }

}
