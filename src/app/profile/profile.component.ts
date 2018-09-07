import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user;
  public oldPassword = '';
  public newPassword = '';
  public passwordCheck = '';

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  clear() {
    this.oldPassword = '';
    this.newPassword = '';
    this.passwordCheck = '';
  }

  submit() {
    this.userService.changePassword(this.user.id, this.oldPassword, this.newPassword, this.passwordCheck);
  }

}
