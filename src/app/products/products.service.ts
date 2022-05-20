import {Injectable} from "@angular/core";
import {Product} from "./products.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductsService {

  private products: Product[]= [];
  productsChanged = new Subject<Product[]>();


  constructor(private http: HttpClient) {}

  getProducts (){
    return this.products.slice()
  }
  setProducts (products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice())
  }

  getProduct(id: number) {
    return this.products.find(product => product.id === id);
  }
  fetchProducts (){
    return this.http.
    get<Product[]>("https://fakestoreapi.com/products")
      .pipe(
        tap(products =>{
          this.setProducts(products);
        })
      )
  }
  fetchProduct (id: number) {
    return this.http
      .get<Product>(`https://fakestoreapi.com/products/${id}`);
  }

}
