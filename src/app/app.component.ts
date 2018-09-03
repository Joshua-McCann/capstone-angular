import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {TopicService} from './topic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Home';

  public linkList = {
    Home: 'Home',
    Topic: 'Topic',
    Login: 'Login'
  };

  constructor(private userServ: UserService, private topicService: TopicService, private router: Router) {  }

  public ngOnInit() {
    console.log('App init');
    this.userServ.loggedIn$.subscribe(any => {
      console.log('detected change ' + any);
      this.replaceLogin(any);
      if (any === 'Logout') {
        this.goTo('Home');
      }
    });

    this.topicService.topicSelection$.subscribe(any => {
      this.setTopic(any);
    });
  }

  public goTo(location: string) {
    this.title = location;
    const navigation = '/' + location.toLowerCase();
    this.router.navigate([navigation]);
  }

  replaceLogin(x: string) {
    this.linkList.Login = x;
  }

  setTopic(x: string) {
    this.title = x;
  }
}
