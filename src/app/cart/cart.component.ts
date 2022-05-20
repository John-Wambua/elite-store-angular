import {Component, OnDestroy, OnInit} from '@angular/core';
import {Cart} from "./cart.model";
import {CartService} from "./cart.service";
import {Subscription} from "rxjs";
import {faLongArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  faLongArrowLeft = faLongArrowLeft;
  cartItems: Cart[] = [];
  subscription: Subscription;
  userSub: Subscription;
  cartTotal: number;
  isAuthenticated = false;

  constructor(private cartService: CartService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.cartService.autoLoadCart();

    this.userSub = this.authService.user
      .subscribe((user: {token: string})=>{
        console.log('User from Cart')
        console.log(user)
        this.isAuthenticated = !!user
      })

    this.subscription = this.cartService.cartChanged.subscribe(
      (cart: Cart [])=>{
        this.cartItems = cart;
        this.cartTotal = this.cartService.getCartTotal(cart)
      }
    )
    this.cartItems = this.cartService.getCart();
    this.cartTotal = this.cartService.getCartTotal(this.cartItems)

    console.log('CART - is Authenticated '+this.isAuthenticated)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userSub.unsubscribe();
  }

}
