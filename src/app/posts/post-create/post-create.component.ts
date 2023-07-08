import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  private mode = 'create';
  private postId!: string;
  public post!: Post;

  constructor(private _formBuilder: FormBuilder,
    public _postsService: PostsService,
    public _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.postForm = this._formBuilder.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      content: ['', Validators.required]
    });

    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this._postsService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          }
          this.postForm.controls.title.setValue(this.post?.title);
          this.postForm.controls.content.setValue(this.post?.content);
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });

  }

  onSavePost() {
    // console.log(this.postForm);

    if (this.mode === 'create') {
      this._postsService.addPosts(this.postForm.controls.title.value, this.postForm.controls.content.value);
    } else {
      this._postsService.updatePost(this.postId, this.postForm.controls.title.value, this.postForm.controls.content.value);
    }

    this.postForm.reset();
  }

}
