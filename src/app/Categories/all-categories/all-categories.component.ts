import { Component } from '@angular/core';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../category.service';
import { ApiResponseInterface } from '../../interfaces/apiResponseInterface';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
@Component({
  selector: 'app-all-categorys',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent {
  constructor(private categoryService:CategoryService ) { }
  categories: Category[] = [];
  totalItems: number= 0;
  totalPages: number= 0;
  currentPage : number = 1;
  pageSize = 10;
  order : string = "asc";
  field : string = "id";


  ngOnInit(): void {
    this.getCategories({ page: "0", size: "1" ,field:"id", order:"asc"});
  }
  
  getCategories(request: any): void {
    this.categoryService
      .getCategories(request)
      .subscribe((data:any) => {
        this.categories = data.content;
        this.currentPage = data.pageable.pageNumber+1;
        this.totalItems= data.totalElements;
        this.pageSize = data.pageable.pageSize;
        this.totalPages = data.totalPages;
      });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getCategories( {page: this.currentPage-1, size: this.pageSize ,field:this.field, order:this.order});
  }

}
