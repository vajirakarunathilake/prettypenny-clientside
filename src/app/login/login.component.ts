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
    newUser.email = document.getElementById('emailR').nodeValue;
    newUser.password = document.getElementById('passwordR').nodeValue;
    this.userService.insert(newUser).subscribe(
      (user) => {

        this.submitted.emit(true);
      }
    );
  }

  submitRegistration(){
    let emailL = document.getElementById('emailL').nodeValue;
    let passwordL = document.getElementById('passwordL').nodeValue;
    this.userService.login(emailL, passwordL).subscribe(
      (user) => {

        this.submitted.emit(true);
      }
    );
  }

  ngOnInit() {
  }

}
