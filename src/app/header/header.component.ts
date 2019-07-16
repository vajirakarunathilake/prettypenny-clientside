import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Helpers } from '../helpers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuToggle = false;

  constructor(private userService: UserService, public helper: Helpers) { }
  logout(){
    this.userService.logout();
  }
  readLocalStorageValue(key) {
    return localStorage.getItem(key);
}
  ngOnInit() {
    localStorage.setItem('check', '0');
  }

}
