import { Component, OnInit } from '@angular/core';
import {TopicService} from './topic.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  public displayedColumns = ['Topic', 'Poster', 'CreateDate'];
  public topics;

  constructor(private topicService: TopicService, private router: Router) {
    const page = 0;
    const perPage = 10;
    this.topicService.getTopics(page, perPage)
      .subscribe((data: Array<object>) => {
        this.topics = data;
      });
  }

  hasNext() {
    let exist = false;
    if (this.topics._links.next) { exist = true; }
    return exist;
  }

  hasLast() {
    let exist = false;
    if (this.topics._links.last) { exist = true; }
    return exist;
  }

  hasPrev() {
    let exist = false;
    if (this.topics._links.prev) { exist = true; }
    return exist;
  }

  hasFirst() {
    let exist = false;
    if (this.topics._links.first) { exist = true; }
    return exist;
  }

  getTopic(id: string) {
    this.router.navigate(['/topic', id]);
  }

  getNext() {
     this.topicService.getPage(this.topics._links.next.href)
       .subscribe((data: Array<object>) => {
       this.topics = data;
     });
  }

  getPrev() {
    this.topicService.getPage(this.topics._links.prev.href)
      .subscribe((data: Array<object>) => {
        this.topics = data;
      });
  }

  getLast() {
    this.topicService.getPage(this.topics._links.last.href)
      .subscribe((data: Array<object>) => {
        this.topics = data;
      });
  }

  getFirst() {
    this.topicService.getPage(this.topics._links.first.href)
      .subscribe((data: Array<object>) => {
        this.topics = data;
      });
  }

  ngOnInit() { }

}
