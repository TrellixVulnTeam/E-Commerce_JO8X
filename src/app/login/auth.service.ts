import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    // kind: string;
    // token: string;
    // email: string;
    // Id: string;
    // registered?: boolean;
    success: boolean;
    message: string;
    data: {
      email: string,
      first_name?: string,
      last_name?: string,
      password?: string,
      id: string,
      token: string,
      userName?: string,
    }

}

@Injectable({ providedIn: "root" })

export class AuthService {
    user:any = new Subject<User>();

    constructor(private http: HttpClient, private router: Router) { }

    signup(first_name: string, last_name: string, email: string, password: string) {

        return this.http.post<AuthResponseData>(
            'http://95.111.202.157/mangoproject/public/api/signup',
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                // returnSecureToken: true
            }
        )
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.data.email,
                        resData.data.id,
                        resData.data.token,
                       

                    );
                })
            );

    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'http://95.111.202.157/mangoproject/public/api/login',
            {               
                email: email,
                password: password            
                // returnSecureToken: true
            }
        )
            .pipe
            (catchError(this.handleError),
                tap(resData => {
                    // console.log(resData.data);
                    
                    this.handleAuthentication(
                        resData.data.email,
                        resData.data.id,
                        resData.data.token

                    );
                })
            );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
      
    }

    private handleAuthentication(email: string, userId: string, token: string) {
        const user = new User(
            email,
            userId,
            token
        );
        this.user.next(user);
        console.log(user);
        
        localStorage.setItem('userData', JSON.stringify(user));
        
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }
        return throwError(errorMessage);
    }
}
function getItem(arg0: string): ((this: any, key: string, value: any) => any) | undefined {
    throw new Error("Function not implemented.");
}