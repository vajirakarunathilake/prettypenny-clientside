import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Helpers } from '../helpers';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() user: User;
  ccv: number;
  creditCardNumber: number;
  address: string;
  passwordR: string;
  emailR: string;
  firstname: string;
  lastname: string;
  passwordL: string;
  emailL: string;
  role: string;
  entries: string[] = [];
  goodCred: boolean = null;
  goodInf: boolean = null;
  resp: string;
  alertClass: string;
  alertShow = false;
  alertContent: string;
  @Output() submitted = new EventEmitter<boolean>();

  constructor(private userService: UserService, private router: Router, public helper: Helpers) {
  }
  submitRegistration(submitRegistrationForm: NgForm) {
    console.log(this.firstname);

    const newUser = new User();
    newUser.email = this.emailR;
    newUser.password = this.passwordR;
    newUser.firstName = this.firstname;
    newUser.lastName = this.lastname;
    newUser.address = this.address;
    newUser.creditCardNumber = this.creditCardNumber;
    newUser.cvv = this.ccv;
    newUser.role = this.role;
    if (newUser.email === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Must provide email.';
    } else if (newUser.password === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Must enter a password.';
    } else if (newUser.firstName === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Please enter first name.';
    } else if (newUser.lastName === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Please enter last name.';
    } else if (newUser.address === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Be sure to supply address.';
    } else if (newUser.creditCardNumber === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Enter a payment method.';
    } else if (newUser.cvv === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Enter the three numbers on the back of your card.';
    } else {
      this.userService.insert(newUser).subscribe(
      (response) => {
        this.resp = response;
        if (this.resp !== '1') {
          this.alertShow = true;
          this.alertClass = 'alert alert-danger';
          this.alertContent = 'Invalid entries or email taken.';
        } else {
            this.alertShow = true;
            this.alertClass = 'alert alert-success';
            this.alertContent = 'Registered and Logged In.';
            this.goodInf = null;
            submitRegistrationForm.onReset();
            this.userService.login(newUser.email, newUser.password).subscribe(
              (u) => {
                this.user = u;
                this.helper.localStorageSet('email', this.user.email);
                this.helper.localStorageSet('firstName', this.user.firstName);
                this.helper.localStorageSet('lastName', this.user.lastName);
                this.helper.localStorageSet('address', this.user.address);
                this.helper.localStorageSet('creditCardNumber', this.user.creditCardNumber + '');
                this.helper.localStorageSet('cvv', this.user.cvv + '');
                this.helper.localStorageSet('role', this.user.role);
                this.helper.localStorageSet('userId', (u.userId + ''));
                this.router.navigate(['']);
              }
            );
          }
        }
      );
    }
  }

  loginUser(loginUserForm: NgForm) {
    if (this.emailL === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Must provide email.';
    } else if (this.passwordL === undefined) {
      this.alertShow = true;
      this.alertClass = 'alert alert-danger';
      this.alertContent = 'Must enter a password.';
    } else {
    this.userService.login(this.emailL, this.passwordL).subscribe(
      (u) => {
        if (u === null) {
          this.alertShow = true;
          this.alertClass = 'alert alert-danger';
          this.alertContent = 'Invalid Credentials.';
        } else {
            this.user = u;
            this.goodCred = null;
            this.helper.localStorageSet('email', this.user.email);
            this.helper.localStorageSet('firstName', this.user.firstName);
            this.helper.localStorageSet('lastName', this.user.lastName);
            this.helper.localStorageSet('address', this.user.address);
            this.helper.localStorageSet('creditCardNumber', this.user.creditCardNumber + '');
            this.helper.localStorageSet('cvv', this.user.cvv + '');
            this.helper.localStorageSet('role', this.user.role);
            this.helper.localStorageSet('userId', (u.userId + ''));
            loginUserForm.onReset();
            this.router.navigate(['']);
          }
        }
      );
    }
  }
  alertMessage(response: string) {
    alert(response);
  }

  ngOnInit() {
    this.entries.push('USER');
    this.entries.push('SELLER');
    this.role = 'USER';
  }

}
