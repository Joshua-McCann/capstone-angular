import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name;
  private user;

  constructor(user: UserService) { this.user = user; }

  ngOnInit() {
    if (this.user.getUser()) {
      const user = this.user.getUser();
      this.name = user.username;
    }
  }

}
