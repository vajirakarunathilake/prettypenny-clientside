import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastyModule } from 'ng2-toasty';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { CartminiComponent } from './cart/cartmini/cartmini.component';
import { NumberInputComponent } from './shared/number-input/number-input.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductComponent } from './products/product/product.component';
import { FiltersComponent } from './products/filters/filters.component';
import { ProductListItemComponent } from './products/product-list-item/product-list-item.component';
import { ToastyNotificationsService } from './services/toasty-notifications.service';
import { ProductsService } from './services/products.service';
import { Routes, RouterModule } from '@angular/router';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchPipe } from './pipes/search.pipe';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ContactComponent,
    CartminiComponent,
    NumberInputComponent,
    HomeComponent,
    ProductsComponent,
    ProductCardComponent,
    ProductComponent,
    FiltersComponent,
    ProductListItemComponent,
    TruncatePipe,
    FilterPipe,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    BrowserAnimationsModule,
    ToastyModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ProductsService,
    ToastyNotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
