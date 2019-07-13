import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { FavoriteComponent } from './products/favorite/favorite.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { CartminiComponent } from './cart/cartmini/cartmini.component';
import { NumberInputComponent } from './shared/number-input/number-input.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    FavoriteComponent,
    HeaderComponent,
    CartComponent,
    ContactComponent,
    CartminiComponent,
    NumberInputComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
