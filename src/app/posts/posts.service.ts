import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(public http: HttpClient) {
  }

  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:8000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map((post: any) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        });
      }))
      .subscribe({
        next: (transformedPosts) => {
          this.posts = transformedPosts;
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
