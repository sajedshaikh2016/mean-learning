import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  public postForm!: any;

  constructor(private _formBuilder: FormBuilder, public _postsService: PostsService) { }

  ngOnInit(): void {
    this.postForm = this._formBuilder.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      content: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.postForm);
    this._postsService.addPosts(this.postForm.controls.title.value, this.postForm.controls.content.value);
  }

}
