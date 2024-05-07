import { Component , EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  constructor() { }
  @Input() totalItems: number= 0;
  @Input() totalPages: number= 1;
  @Input() currentPage: number= 1;
  @Input() pageSize: number= 5;
  @Output() pageChange = new EventEmitter<number>();


  get pages() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    console.log(page, this.currentPage,this.totalPages )
    if (page !== this.currentPage-1 )  {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
    
  }

}
