import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { PostsService } from './posts.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PostsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postsService: PostsService;

  let router: Router;

  let POSTS = [
    {
      "id": "64a958dcf91f7f6dd374196c",
      "title": "post title 1",
      "content": "post content 1"
    },
    {
      "id": "64a958e5f91f7f6dd374196f",
      "title": "post title 2",
      "content": "post content 2"
    },
    {
      "id": "64a958f2f91f7f6dd3741972",
      "title": "post title 3",
      "content": "post content 3"
    }
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    postsService = TestBed.inject(PostsService);
    router = TestBed.inject(Router)

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    postsService = new PostsService(httpClientSpy, router);
  });

  it('should be created', () => {
    expect(postsService).toBeTruthy();
  });

  /*
    describe('PostsService', () => {
  
      it('should return expected posts when getPosts is called.', (done: DoneFn) => {
  
        httpClientSpy.get.and.returnValue(of(POSTS));
        postsService.getPosts().subscribe({
          next: (posts: any) => {
            expect(posts).toEqual(POSTS);
            done();
          },
          error: (error: any) => {
            console.error(error);
          }
        });
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      });
  
    });
  */


});
