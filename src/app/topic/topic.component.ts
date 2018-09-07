import { Component, OnInit } from '@angular/core';
import {TopicService} from '../topic.service';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  public displayedColumns = ['Topic', 'Poster', 'CreateDate'];
  public topics;
  public newTopic;
  public newTopicMessage;
  public createTopicB = false;

  constructor(private userService: UserService,
              private topicService: TopicService,
              private router: Router,
              private matSnackBar: MatSnackBar) {
    const page = '0';
    const perPage = '10';
    this.topicService.getTopics(page, perPage)
      .subscribe((data: Array<object>) => {
        this.topics = data;
      });
  }

  createTopic() {
    this.createTopicB = true;
  }

  send() {
    let topic;
    topic = {
      user: this.userService.getUser(),
      topicName: this.newTopic,
      postingList: [{
          user: this.userService.getUser(),
          message: this.newTopicMessage
      }]
    };

    this.topicService.sendTopic(topic).subscribe(data => {
      this.createTopicB = false;
      this.newTopicMessage = '';
      this.newTopic = '';
      this.topicService.getPage(this.topics._links.self.href)
        .subscribe((newPage: Array<object>) => {
          this.topics = newPage;
        },
        error => {
          this.matSnackBar.open( error.message, null, {
            duration: 2500,
            panelClass: ['error-snackbar']
        });
      });
    }, error => {
      this.matSnackBar.open( error.message, null, {
        duration: 2500,
        panelClass: ['error-snackbar']
      });
    });
  }

  cancel() {
    this.createTopicB = false;
  }

  loggedIn() {
    return this.userService.isLoggedIn();
  }

  hasNext() {
    let exist = true;
    if (this.topics._links && this.topics._links.next) { exist = false; }
    return exist;
  }

  hasLast() {
    let exist = true;
    if (this.topics._links && this.topics._links.last) { exist = false; }
    return exist;
  }

  hasPrev() {
    let exist = true;
    if (this.topics._links && this.topics._links.prev) { exist = false; }
    return exist;
  }

  hasFirst() {
    let exist = true;
    if (this.topics._links && this.topics._links.first) { exist = false; }
    return exist;
  }

  getTopic(id: string, message: string) {
    this.topicService.setTopic(message);
    this.router.navigate(['/topic', id]);
  }

  getNext() {
     this.topicService.getPage(this.topics._links.next.href)
       .subscribe((data: Array<object>) => {
       this.topics = data;
     }, error => {
         this.matSnackBar.open( error.message, null, {
           duration: 2500,
           panelClass: ['error-snackbar']
         });
       });
  }

  getPrev() {
    this.topicService.getPage(this.topics._links.prev.href)
      .subscribe((data: Array<object>) => {
        this.topics = data;
      }, error => {
        this.matSnackBar.open( error.message, null, {
          duration: 2500,
          panelClass: ['error-snackbar']
        });
      });
  }

  getLast() {
    this.topicService.getPage(this.topics._links.last.href)
      .subscribe((data: Array<object>) => {
        this.topics = data;
      }, error => {
        this.matSnackBar.open( error.message, null, {
          duration: 2500,
          panelClass: ['error-snackbar']
        });
      });
  }

  getFirst() {
    this.topicService.getPage(this.topics._links.first.href)
      .subscribe((data: Array<object>) => {
        this.topics = data;
      }, error => {
        this.matSnackBar.open( error.message, null, {
          duration: 2500,
          panelClass: ['error-snackbar']
        });
      });
  }

  ngOnInit() { }

}
