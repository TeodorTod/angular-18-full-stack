import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../../types';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productsData: any;
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {
        page: 0,
        perPage: 5,
      })
      .subscribe((products: Products) => {
        console.log(products);
        this.productsData = products
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


