import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Helpers } from '../helpers';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() user: User;
  ccv: string;
  creditcardnumber: string;
  address: string;
  passwordR: string;
  emailR: string;
  firstname: string;
  lastname: string;
  passwordL: string;
  emailL: string;
  goodCred: boolean = null;
  goodInf: boolean = null;
  resp: string;
  @Output() submitted = new EventEmitter<boolean>();

  constructor(private userService: UserService, private router: Router, public helper: Helpers) {
  }

  submitRegistration() {
    let newUser = new User();
    newUser.email = this.emailR;
    newUser.password = this.passwordR;
    newUser.firstName = this.firstname;
    newUser.lastName = this.lastname;
    newUser.address = this.address;
    newUser.creditCardNumber = this.creditcardnumber;
    newUser.cvv = this.ccv;
    newUser.role = 'USER';
    this.userService.insert(newUser).subscribe(
      (response) => {
        this.resp = response;
        if (this.resp !== 'User Inserted') {
          this.goodInf = false;
        }
        else {
          this.goodInf = null;
          this.userService.login(newUser.email, newUser.password).subscribe(
            (u) => {
              this.user = u;
              this.helper.localStorageSet('email', this.user.email);
              this.helper.localStorageSet('firstname', this.user.firstName);
              this.helper.localStorageSet('lastname', this.user.lastName);
              this.helper.localStorageSet('address', this.user.address);
              this.helper.localStorageSet('creditCardNumber', this.user.creditCardNumber);
              this.helper.localStorageSet('cvv', this.user.cvv);
              this.helper.localStorageSet('role', this.user.role);
              this.helper.localStorageSet('userId', (this.user.userId + ""));
              console.log('User is logged in');
              this.router.navigate(['/products']);
            }
          );
        }
      }
    );


  }

  loginUser() {
    console.log(this.emailL);
    this.userService.login(this.emailL, this.passwordL).subscribe(
      (u) => {
        if (u === null) {
          this.goodCred = false;
        }
        else {
          this.user = u;
          this.goodCred = null;
          this.helper.localStorageSet('email', this.user.email);
          this.helper.localStorageSet('firstName', this.user.firstName);
          this.helper.localStorageSet('lastName', this.user.lastName);
          this.helper.localStorageSet('address', this.user.address);
          this.helper.localStorageSet('creditCardNumber', this.user.creditCardNumber);
          this.helper.localStorageSet('cvv', this.user.cvv);
          this.helper.localStorageSet('role', this.user.role);
          this.helper.localStorageSet('userId', (this.user.userId + ""));
          console.log('User is logged in');
          this.router.navigate(['/products']);
        }
      }
    );
  }

  alertMessage(response: string) {
    alert(response);
  }

  ngOnInit() {
  }

}
