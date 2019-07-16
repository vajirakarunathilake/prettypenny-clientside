import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  
  quantityLabel : String = "Quantity";
  productName : String;
  brandName : String;
  category : String;
  subCategory : String;
  imagePath : String;
  productDescription : String;
  listType : number;
  quantity : number;
  msrp : number;
  salePrice : number;
  




  constructor(private productService :ProductService) { }

  ngOnInit() {
  }

  addProduct(){
    console.log(this.listType);
  }

  changeLabel(){
    console.log("work");
    
    if(this.listType == 0){
      this.quantityLabel = "Quantity";

    }else if(this.listType == 1){
      this.quantityLabel = "Minimum Threshold Value";
    }
  }

}
