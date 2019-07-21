import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastyComponent, ToastOptions, ToastData } from 'ng2-toasty';


@Injectable({
  providedIn: 'root'
})
export class ToastyNotificationsService {

  constructor(private toastyService: ToastyService) {}

  addToast(cartEmptied = false, prodName: string = '', alertType = false, noSearchedProduct = false) {
    let message;
    if (!noSearchedProduct) {
      message = cartEmptied ? 'Cart emptied' : `${prodName}, ${alertType ? 'added to' : 'removed from'} cart`;
    } else {
      message = 'Product you just searched for does not exist';
    }

    const toastOptions: ToastOptions = {
      title: '',
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'material',
    };
    alertType ? this.toastyService.success(toastOptions) : this.toastyService.error(toastOptions);
  }

  checkout(cost: number) {
    const toastOptions: ToastOptions = {
      title: '',
      msg: `Total: $${cost.toFixed(2)}. Thank you for shopping with Pretty Penny!`,
      showClose: true,
      timeout: 5000,
      theme: 'material',
    };
    this.toastyService.success(toastOptions);
  }

}
