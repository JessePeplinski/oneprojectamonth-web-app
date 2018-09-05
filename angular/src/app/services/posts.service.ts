import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

const url = 'https://jsonplaceholder.typicode.com';
const url2 = 'http://localhost:8080/api/posts';

@Injectable()
export class PostsService {

  constructor(private http: HttpClient) { }

  // Get all posts from the API
  getAllPosts() {
    return this.http.get(url).map((res: Response) => res.json());
  }
}