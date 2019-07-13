import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { FavoriteComponent } from './products/favorite/favorite.component';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { PurchaseService } from './services/purchase.service';
import { TaxonomyService } from './services/taxonomy.service';
import { InterestService } from './services/interest.service';
import { FavoriteService } from './services/favorite.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    FavoriteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    ProductService,
    PurchaseService,
    TaxonomyService,
    InterestService,
    FavoriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
