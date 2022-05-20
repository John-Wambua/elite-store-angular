import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "./products/products.service";
import {AuthService} from "./auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  productsSub: Subscription;
  isFetching = false;
  constructor(private productsService: ProductsService,
              private authService: AuthService) {}
  ngOnInit(): void {
    this.isFetching = true;
    this.authService.autoLogin();
    this.productsSub = this.productsService.fetchProducts().subscribe(
      (resData)=>{
        this.isFetching = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

}
