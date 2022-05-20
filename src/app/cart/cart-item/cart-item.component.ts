import {Component, Input, OnInit} from '@angular/core';
import {faPlus, faMinus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Cart} from "../cart.model";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;

  @Input() cart!: Cart;
  @Input() index!: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

  }

  onAddItemQuantity(){
    this.cartService.incrementCartItemQuantity(this.index);
  }
  onReduceItemQuantity(){
    this.cartService.decrementCartItemQuantity(this.index);
  }
  onRemoveItem(){
    this.cartService.removeProductFromCart(this.index);
  }
}
