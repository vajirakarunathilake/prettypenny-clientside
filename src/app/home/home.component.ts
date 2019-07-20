import { Component, OnInit } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeURI: string;
  // constructor(private http: Http) {}
  constructor() {}

  ngOnInit() {
    this.homeURI = environment.homeURI;
  }
}
