import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public password_check = '';
  public email = '';

  constructor(private userServ: UserService) {

  }

  ngOnInit() {
    this.userServ.login('McCanicle', 'TempPassword');
  }

  submit() {
    this.userServ.login(this.username, this.password);
  }

  register() {
    this.userServ.register(this.username,
      this.password,
      this.password_check,
      this.email);
  }

  clear() {
    this.username = '';
    this.password = '';
    this.password_check = '';
    this.email = '';
  }

}
