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
  public isLoading: boolean = false;

  constructor(public _postsService: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this._postsService.getPosts();
    this.postSubscription = this._postsService.getPostUpdateListener()
      .subscribe({
        next: (posts: Post[]) => {
          this.posts = posts;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Subscribe complete.");
        }
      });
  }

  onDelete(postId: string) {
    this._postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe();
  }

}
