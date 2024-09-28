import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductComponent } from "../components/product/product.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = []
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {
        page: 0,
        perPage: 5,
      })
      .subscribe((products: Products) => {
        console.log(products);
        this.products = products.items
      });
  }
}

// productsData$!: Observable<Products>;

// constructor(private productService: ProductsService) {

// }

// ngOnInit(): void {
//   this.productsData$ = this.productService.getProducts('http://localhost:3000/clothes',
//     {
//       page: 0,
//       perPage: 5,
//     }
//   )
// }


