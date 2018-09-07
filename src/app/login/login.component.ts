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
  public passwordCheck = '';
  public email = '';

  constructor(private userServ: UserService) {

  }

  ngOnInit() {
  }

  submit() {
    this.userServ.login(this.username, this.password);
  }

  register() {
    this.userServ.register(this.username,
      this.password,
      this.passwordCheck,
      this.email);
  }

  clear() {
    this.username = '';
    this.password = '';
    this.passwordCheck = '';
    this.email = '';
  }

}
