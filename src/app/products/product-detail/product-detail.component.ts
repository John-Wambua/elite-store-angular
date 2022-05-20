import { Component, OnInit } from '@angular/core';
import {faLongArrowLeft, faShoppingCart, faHeart, faShare} from "@fortawesome/free-solid-svg-icons";
import {Product} from "../products.model";
import {ProductsService} from "../products.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  faLongArrowLeft = faLongArrowLeft;
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;
  faShare = faShare;
  product!: Product;
  id!: number;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private router: Router) { }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
      }
    );
    this.id = +this.route.snapshot.params['id'];

    this.product = this.productsService.getProduct(this.id);

  }

  onAddProductToCart(){
    this.cartService.addProductToCart(this.product);
    this.router.navigate(['/cart']);
  }

}
