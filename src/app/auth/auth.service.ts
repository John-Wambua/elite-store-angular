import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {tap} from "rxjs/operators";

import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<{token: string}>(null);

  constructor(private http: HttpClient,
              private router: Router) {}

  login(username: string, password: string){
    return this.http
      .post<{token: string}>("https://fakestoreapi.com/auth/login",{
        username,
        password
      })
      .pipe(
        tap((resData: {token: string})=>{
          if (resData.token){
            this.user.next(resData);
            localStorage.setItem('userData', JSON.stringify(resData));
          }
        })
      )
  }
  logout(){
    this.router.navigate(['/auth'])
    this.user.next(null);
    localStorage.removeItem('userData');
  }


  autoLogin() {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return
    }
    this.user.next(user)
  }
}
