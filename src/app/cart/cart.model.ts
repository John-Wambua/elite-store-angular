import {Product} from "../products/products.model";

export class Cart {

  public total: number;
  constructor( public product: Product, public quantity: number) {
    this.total = (this.product.price * this.quantity);
  }

}
