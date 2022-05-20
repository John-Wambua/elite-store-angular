import {Component, Input, OnInit} from '@angular/core';
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import {Product} from "../../products.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  faFolder = faFolder;
  @Input() product!: Product;
  @Input() id!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
