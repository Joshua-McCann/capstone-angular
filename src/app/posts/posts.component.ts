import { Component, OnInit } from '@angular/core';
import {TopicService} from '../topic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts;
  public createPostB = false;
  public newPost = 'blah blah blah';
  private topicId;

  constructor(private userService: UserService, private topicService: TopicService, private route: ActivatedRoute, private router: Router) {
    const page = '0';
    const perPage = '10';
    // @ts-ignore
    this.topicId = this.route.params._value.id;

    this.topicService.getPosts(page, perPage, this.topicId)
      .subscribe((data: Array<object>) => {
        this.posts = data;
      });
  }

  createPost() {
    this.createPostB = true;
  }

  send() {
    let posting;
    posting = {
      user: this.userService.getUser(),
      message: this.newPost
    };

    this.topicService.sendPosting(posting, this.topicId).subscribe(data => {
      this.posts.content.push(data);
      this.createPostB = false;
    });
  }

  cancel() {
    this.createPostB = false;
  }

  loggedIn() {
    return this.userService.isLoggedIn();
  }

  hasNext() {
    let exist = true;
    if (this.posts._links.next) { exist = false; }
    return exist;
  }

  hasLast() {
    let exist = true;
    if (this.posts._links.last) { exist = false; }
    return exist;
  }

  hasPrev() {
    let exist = true;
    if (this.posts._links.prev) { exist = false; }
    return exist;
  }

  hasFirst() {
    let exist = true;
    if (this.posts._links.first) { exist = false; }
    return exist;
  }

  getNext() {
    this.topicService.getPage(this.posts._links.next.href)
      .subscribe((data: Array<object>) => {
        this.posts = data;
      });
  }

  getPrev() {
    this.topicService.getPage(this.posts._links.prev.href)
      .subscribe((data: Array<object>) => {
        this.posts = data;
      });
  }

  getLast() {
    this.topicService.getPage(this.posts._links.last.href)
      .subscribe((data: Array<object>) => {
        this.posts = data;
      });
  }

  getFirst() {
    this.topicService.getPage(this.posts._links.first.href)
      .subscribe((data: Array<object>) => {
        this.posts = data;
      });
  }

  ngOnInit() {
  }

}
