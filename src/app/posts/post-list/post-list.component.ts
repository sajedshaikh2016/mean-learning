import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  panelOpenState = false;

  // posts = [
  //   { title: "First posts", content: "This is first post's content." },
  //   { title: "Second posts", content: "This is second post's content." },
  //   { title: "Third posts", content: "This is third post's content." },
  // ];

  @Input() posts: Post[] = [];

}
