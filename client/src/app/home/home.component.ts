import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductComponent } from "../components/product/product.component";
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('paginator') paginator: Paginator | undefined;
  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;
  selectedProduct: Product = {
    id: 0,
    price: '',
    name: '',
    image: '',
    rating: 0,
  };

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
    this.fetchProducts(event.page, event.rows)
  }

  onProductOutput = (product: Product) => {
    // console.log(product);
  }

  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  };

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
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
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  };

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }

    this.deleteProduct(product.id);
  }                                                                                                  

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  resetPaginator() {
    this.paginator?.changePage(0);
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


