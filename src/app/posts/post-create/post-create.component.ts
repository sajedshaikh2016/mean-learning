import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { mimeType } from './mime-type.validator';
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
  public isLoading: boolean = false;
  public imagePreview: string;

  constructor(private _formBuilder: FormBuilder,
    public _postsService: PostsService,
    public _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.postForm = this._formBuilder.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      content: ['', Validators.required],
      image: ['', Validators.required, mimeType]
    });

    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this._postsService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath
          }
          this.postForm.controls.title.setValue(this.post?.title);
          this.postForm.controls.content.setValue(this.post?.content);
          this.postForm.controls.imagePath.setValue(this.post?.imagePath);
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });

  }

  onSavePost() {
    // console.log(this.postForm);
    this.isLoading = true;
    if (this.mode === 'create') {
      this._postsService.addPosts(this.postForm.controls.title.value, this.postForm.controls.content.value, this.postForm.controls.image.value);
    } else {
      this._postsService.updatePost(this.postId, this.postForm.controls.title.value, this.postForm.controls.content.value, this.postForm.controls.image.value);
    }

    this.postForm.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({ image: file });
    this.postForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

}
