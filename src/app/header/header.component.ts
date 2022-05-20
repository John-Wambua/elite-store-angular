import {Component, OnDestroy, OnInit} from '@angular/core';
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  faShoppingCart = faShoppingCart;
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(
      (user:{token: string})=>{
        this.isAuthenticated = !!user;
      }
    )
    console.log('is authenticated ? '+this.isAuthenticated);
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
