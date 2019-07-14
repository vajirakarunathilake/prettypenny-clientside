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
    let submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', (e: Event) => this.submitRegistration());
  }

  submitRegistration(){
    let newUser = new User();
    newUser.email = document.getElementById('emailR').value;
    newUser.password = document.getElementById('passwordR').value;
    newUser.firstName = document.getElementById('firstname').value;
    newUser.lastName = document.getElementById('lastname').value;
    newUser.address = document.getElementById('address').value;
    newUser.creditCardNumber = document.getElementById('creditcardnumber').value;
    newUser.cvv = document.getElementById('ccv').value;
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
    let emailL = document.getElementById('emailL').value;
    let passwordL = document.getElementById('passwordL').value;
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
