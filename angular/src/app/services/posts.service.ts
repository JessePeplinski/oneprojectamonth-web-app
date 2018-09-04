import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  constructor(private http: HttpClientModule) { }

  // Get all posts from the API
  getAllPosts() {
    return this.http.get('http://localhost:8080/api/posts').map(res => res.json());
  }
}