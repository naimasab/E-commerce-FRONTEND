import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../product.service';
import { ApiResponseInterface } from '../../interfaces/apiResponseInterface';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  constructor(private productService:ProductService ) { }
  products: Product[] = [];
  totalItems: number= 0;
  totalPages: number= 0;
  currentPage : number = 1;
  pageSize = 10;
  order : string = "asc";
  field : string = "id";


  ngOnInit(): void {
    this.getProducts({ page: "0", size: "1" ,field:"id", order:"asc"});
  }
  
  getProducts(request: any): void {
    this.productService
      .getProducts(request)
      .subscribe((data:any) => {
        this.products = data.content;
        this.currentPage = data.pageable.pageNumber+1;
        this.totalItems= data.totalElements;
        this.pageSize = data.pageable.pageSize;
        this.totalPages = data.totalPages;
      });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts( {page: this.currentPage-1, size: this.pageSize ,field:this.field, order:this.order});
  }

}
