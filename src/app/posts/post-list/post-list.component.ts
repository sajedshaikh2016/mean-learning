import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  panelOpenState = false;

  // posts = [
  //   { title: "First posts", content: "This is first post's content." },
  //   { title: "Second posts", content: "This is second post's content." },
  //   { title: "Third posts", content: "This is third post's content." },
  // ];

  @Input() posts: Post[] = [];

  ngOnInit() {
    console.log("this.posts", this.posts);
  }

}
