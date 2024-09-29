import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'] // Ensure this is "styleUrls" (not "styleUrl")
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Output() productOutput: EventEmitter<Product> = new EventEmitter<Product>();


  ngOnInit(): void {
    this.productOutput.emit(this.product)
  }
}
