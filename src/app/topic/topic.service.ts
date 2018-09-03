import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiURL = `http://localhost:8080/`;

  constructor(private http: HttpClient) { }

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

}
