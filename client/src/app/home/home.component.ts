import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductComponent } from "../components/product/product.component";
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.fetchProducts(0, this.rows)
  }

  fetchProducts = (page: number, perPage: number) => {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {
        page,
        perPage,
      })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total
        },
        error: (error) => {
          console.log(error);
        }
      });
  };

  onPageChange = (event: any) => {
    console.log(event);

    this.fetchProducts(event.page, event.rows)
  }

  onProductOutput = (product: Product) => {
    // console.log(product);
  }

  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  };

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  };

  addProduct(product: Product) {
    this.productsService
      .addProduct('http://localhost:3000/clothes', product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  };

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


