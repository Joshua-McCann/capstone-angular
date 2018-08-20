import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Home';
  logout = true;

  public ngOnInit() {
    console.log('App init');
  }

  public goTo(location){
    this.title = location;
  }

  public loginPress() {
    this.logout = !this.logout;
    if (this.logout) {
      this.title = "logout";
    } else {
      this.title = "login";
    }
  }

}
