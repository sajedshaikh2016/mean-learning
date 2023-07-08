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

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:8000/api/posts/' + id);
  }

  addPosts(title: string, content: string) {
    const post: Post = { id: '', title: title, content: content };
    this.http.post<{ message: string, postId: string }>('http://localhost:8000/api/posts', post)
      .subscribe({
        next: (responseData) => {
          const id = responseData.postId;
          post.id = id;
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

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http.put('http://localhost:8000/api/posts' + id, post).subscribe((response) => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:8000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

}
