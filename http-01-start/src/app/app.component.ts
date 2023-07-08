import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from "./post.model";
import { PostsService } from "./posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  url: string;
  isFetching = false;
  error = null;
  private errorSub: Subscription;


  constructor(private http: HttpClient,
              private postsService: PostsService) {
  }

  ngOnInit() {
    this.errorSub = this.postsService.error
      .subscribe((errorMessage) => {
        this.error = errorMessage;
      });

    this.url = 'https://ng-http-f2669-default-rtdb.europe-west1.firebasedatabase.app/';
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        console.log(posts);
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.error = error.message;
        this.isFetching = false;
      });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.postsService.fetchPosts()
      .subscribe(posts => {
        // console.log(posts);
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.error = error.message;
        this.isFetching = false;
        console.log(error);
      });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }


  onHandeError() {
    this.error = null;
  }

  // private fetchPosts() {
  //   this.isFetching = true;
  //
  // }
}
