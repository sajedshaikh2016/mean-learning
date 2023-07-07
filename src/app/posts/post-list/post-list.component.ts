import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  public panelOpenState = false;
  public posts: Post[] = [];
  private postSubscription!: Subscription;

  constructor(public _postsService: PostsService) { }

  ngOnInit() {
    this.posts = this._postsService.getPosts();
    this.postSubscription = this._postsService.getPostUpdateListener()
      .subscribe({
        next: (posts: Post[]) => {
          this.posts = posts;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Subscribe complete.");
        }
      });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

}
