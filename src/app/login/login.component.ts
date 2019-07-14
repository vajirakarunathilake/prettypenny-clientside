import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() user: User;
  @Output() submitted = new EventEmitter<boolean>();
  constructor(private userService: UserService) {
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
      (user) => {
        this.user = user;
      }
    );


  }

  loginUser(){
    let emailL = document.getElementById('emailL').value;
    let passwordL = document.getElementById('passwordL').value;
    this.userService.login(emailL, passwordL).subscribe(
      (user) => {

        this.submitted.emit(true);
      }
    );
  }

  alertMessage(response: string){
    alert(response);
  }

  ngOnInit() {
  }

}
