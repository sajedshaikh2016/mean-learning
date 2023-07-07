import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  public postForm!: any;
  @Output() postCreated = new EventEmitter<Post>();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this._formBuilder.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      content: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.postForm);
    const post: Post = {
      title: this.postForm.controls.title.value,
      content: this.postForm.controls.content.value
    }
    this.postCreated.emit(post);
  }

}
