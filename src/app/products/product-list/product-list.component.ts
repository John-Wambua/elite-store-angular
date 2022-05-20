import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../products.service";
import {Product} from "../products.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  productsSub!: Subscription;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsSub = this.productsService.productsChanged.subscribe(
      products =>{
        this.products = products;
      }
    )
    this.products = this.productsService.getProducts();
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }


}
