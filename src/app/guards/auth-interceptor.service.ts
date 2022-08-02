import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {take, exhaustMap } from  "rxjs/operators"
import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authService.user.pipe(take(1),
        exhaustMap((user) => {
            if (!user) {
              return next.handle(req);
            }
            const modRequest = req.clone({
              setHeaders: {
                Authorization: 'Bearer ' + user.token,
              },
            });
            return next.handle(modRequest);
          })
         );
    }
 }