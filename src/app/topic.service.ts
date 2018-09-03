import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiURL = `http://localhost:8080/`;
  public topicSelection$: EventEmitter<string>;

  constructor(private http: HttpClient) {
    this.topicSelection$ = new EventEmitter<string>();
  }

  getTopics(page: string, perPage: string) {
    return this.http.get(this.apiURL + 'topic', {
      params: {
        page: page,
        perPage: perPage
      }
    });
  }

  getPage(page: string) {
    return this.http.get(page);
  }

  getPosts(page: string, perPage: string, id: string) {
    return this.http.get(this.apiURL + 'post', {
      params: {
        topicId: id,
        page: page,
        perPage: perPage
      }
    });
  }

  setTopic(topic: string) {
    this.topicSelection$.emit(topic);
  }

  sendTopic(topic: object) {
    return this.http.post(this.apiURL + 'topic', topic, {
    });
  }

  sendPosting(post: object, topicId: string) {
    return this.http.post(this.apiURL + 'post', post, {
      params: {
        topicId: topicId
      }
    });
  }

}
