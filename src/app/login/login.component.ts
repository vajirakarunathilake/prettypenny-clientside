import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() user: User;
  resp: string;
  @Output() submitted = new EventEmitter<boolean>();
  constructor(private userService: UserService, private router: Router) {
    let submitBtn = angular.element('#submit');
    submitBtn.addEventListener('click', (e: Event) => this.submitRegistration());
    let loginBtn = angular.element('#login');
    loginBtn.addEventListener('click', (e: Event) => this.loginUser());
  }

  submitRegistration(){
    let newUser = new User();
    newUser.email = angular.element('#emailR').val();
    newUser.password = angular.element('#passwordR').val();
    newUser.firstName = angular.element('#firstname').val();
    newUser.lastName = angular.element('#lastname').val();
    newUser.address = angular.element('#address').val();
    newUser.creditCardNumber = angular.element('#creditcardnumber').val();
    newUser.cvv = angular.element('#ccv').val();
    newUser.role = 'USER';
    this.userService.insert(newUser).subscribe(
      (response) => {
        this.resp = response;
        if (this.resp !== 'User Inserted'){
          this.alertMessage(this.resp);
        }
        else{
          this.alertMessage(this.resp);
          this.userService.login(newUser.email, newUser.password).subscribe(
            (u) => {
              this.user = u;
              localStorage.setItem('user', this.user);
              console.log('User is logged in');
              this.router.navigate(['/products']);
            }
          );
        }
      }
    );


  }

  loginUser(){
    let emailL = angular.element('#emailL').val();
    let passwordL = angular.element('#passwordL').val();
    this.userService.login(emailL, passwordL).subscribe(
      (u) => {
        if (u === null){
          this.alertMessage('Invalid Credentials');
        }
        else{
        localStorage.setItem('email', this.user.email);
        localStorage.setItem('firstname', this.user.firstName);
        localStorage.setItem('lastname', this.user.lastName);
        localStorage.setItem('address', this.user.address);
        localStorage.setItem('creditCardNumber', this.user.creditCardNumber);
        localStorage.setItem('cvv', this.user.cvv);
        localStorage.setItem('role', this.user.role);
        console.log('User is logged in');
        this.router.navigate(['/products']);
        }
      }
    );
  }

  alertMessage(response: string){
    alert(response);
  }

  ngOnInit() {
  }

}
