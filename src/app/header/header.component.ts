import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Helpers } from '../helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuToggle = false;

  constructor(private userService: UserService, private router: Router, public helper: Helpers) { }
  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
  readLocalStorageValue(key) {
    return localStorage.getItem(key);
  }
  ngOnInit() {
    localStorage.setItem('check', '0');
  }

}
