import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(public http: HttpClient) {
  }

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:8000/api/posts')
      .subscribe({
        next: (response) => {
          this.posts = response.posts;
          this.postsUpdated.next([...this.posts]);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Subscribe complete.");
        }
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = { id: '', title: title, content: content };
    this.http.post<{ message: string }>('http://localhost:8000/api/posts', post)
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.posts.push(post);
          this.postsUpdated.next([...this.posts]);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Subscribe complete.");
        }
      });


  }
}
