import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.url) {
    //
    // }
    // console.log(req.url);
    const modifedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz123')
    });
    // console.log('Request is on its way');
    return next.handle(modifedRequest)
      // .pipe(tap(event => {
      //       console.log(event);
      //       if (event.type === HttpEventType.Response) {
      //         console.log('Response arived body data:');
      //         console.log(event.body);
      //       }
      //     }
      //   )
      // );
  }
}
