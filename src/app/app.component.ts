import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {TopicService} from './topic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  public title = 'Home';

  public linkList = ['Home', 'Topic', 'Login' ];

  constructor(private userService: UserService, private topicService: TopicService, private router: Router) {  }

  public ngOnInit() {
    console.log('App init');

    this.topicService.topicSelection$.subscribe(any => {
      this.setTopic(any);
    });
  }

  public ngAfterViewInit() {
    this.userService.loggedIn$.subscribe(any => {
      setTimeout(() => {
        if (any === true) {
          this.linkList.splice(2,1, 'Logout', 'Profile');
          this.goTo('Home');
        } else {
          this.linkList.splice(2, 2, 'Login');
        }
      });
    });
  }

  public goTo(location: string) {
    this.title = location;
    const navigation = '/' + location.toLowerCase();
    this.router.navigate([navigation]);
  }

  setTopic(x: string) {
    this.title = x;
  }
}
