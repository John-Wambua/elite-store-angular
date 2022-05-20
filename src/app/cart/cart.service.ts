import {Injectable} from "@angular/core";
import {Cart} from "./cart.model";
import {Product} from "../products/products.model";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class CartService{
  private cart: Cart[] = [];
  cartChanged = new Subject<Cart[]>()

  getCart(){
    return this.cart.slice();
  }

  addProductToCart(product: Product) {
    if (this.isProductInCart(product)){
      const index: number = this.getProductIndexInCart(product);
      this.incrementCartItemQuantity(index);
      return;
    }
    this.cart.push(new Cart(product,1));
    this.cartChanged.next(this.cart.slice());
    localStorage.setItem('cart', JSON.stringify(this.cart.slice()))
  }

  private isProductInCart(product: Product){
    return !!this.cart.find(cartItem =>cartItem.product.id === product.id);
  }

  private getProductIndexInCart(product: Product) {
    let index = -1;
    this.cart.forEach((cartItem: Cart, i: number)=>{
      if (cartItem.product.id === product.id){
        index = i;
      }
    })
    return index;
  }
  removeProductFromCart(index: number) {

    this.cart.splice(index, 1);
    this.cartChanged.next(this.cart.slice());
    localStorage.setItem('cart', JSON.stringify(this.cart.slice()))
  }
  incrementCartItemQuantity(index: number){
    const cartItem = this.cart[index];
    this.cart[index] = new Cart(cartItem.product, cartItem.quantity + 1);
    this.cartChanged.next(this.cart.slice());
    localStorage.setItem('cart', JSON.stringify(this.cart.slice()))
  }
  decrementCartItemQuantity(index: number){
    const cartItem = this.cart[index];
    if (cartItem.quantity<=1){
      return;
    }
    this.cart[index] = new Cart(cartItem.product, cartItem.quantity -1);
    this.cartChanged.next(this.cart.slice());
    localStorage.setItem('cart', JSON.stringify(this.cart.slice()))
  }
  getCartTotal(cart: Cart[]){
    let total = 0;
    for (let cartItem of cart){
      total +=cartItem.total;
    }
    return total;
  }

  autoLoadCart(){
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }
}
