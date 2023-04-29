import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Post } from "./post.model";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, Subject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {
  url: string;
  error = new Subject<string>();


  constructor(private http: HttpClient) {
    this.url = 'https://ng-http-f2669-default-rtdb.europe-west1.firebasedatabase.app/';
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http.post<{ name: string }>(
      this.url + 'post.json',
      postData,
      {
        observe: 'response',
      }
    )
      .subscribe(responseData => {
        console.log(responseData);
      }, error1 => {
        this.error.next(error1.message);
      });
  }

  fetchPosts(): Observable<Post[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('nice', 'boobs');
    return this.http
      .get<{ [s: string]: Post }>(this.url + 'post.json', {
        headers: new HttpHeaders({"Custom-header": "hello"}),
        params: searchParams,
        // responseType: 'json',
      })
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        }),
        catchError(err => {
          //send to analytics server
          return throwError(err);
        })
      );
  }


  deletePosts() {
    return this.http.delete(this.url + 'post.json',
      {
        observe: 'events',
        responseType: 'text',
      }
    ).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Sent) {
        // ..
      }
      if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }

}
