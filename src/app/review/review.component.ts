import { Component, OnInit } from '@angular/core';

interface Review {
  id: number;
  consumerName: string;
  productName: string;
  rating: number;
  headline: string;
  comment: string;
  createdAt: string;
  modifiedAt: string;
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  reviewsData: Review[] = [
    {
      id: 1,
      consumerName: 'John Doe',
      productName: 'Product A',
      rating: 5,
      headline: 'Great product!',
      comment: 'Lorem ipsum...',
      createdAt: '2024-05-01',
      modifiedAt: '2024-05-02',
    },
    {
      id: 2,
      consumerName: 'Jane Smith',
      productName: 'Product B',
      rating: 2,
      headline: 'Not impressed',
      comment: 'Lorem ipsum...',
      createdAt: '2024-05-03',
      modifiedAt: '2024-05-03',
    },
    {
      id: 3,
      consumerName: 'Alice Johnson',
      productName: 'Product C',
      rating: 4,
      headline: 'Decent product',
      comment: 'Lorem ipsum...',
      createdAt: '2024-05-04',
      modifiedAt: '2024-05-04',
    },
    {
      id: 4,
      consumerName: 'Bob Williams',
      productName: 'Product D',
      rating: 3,
      headline: 'Average product',
      comment: 'Lorem ipsum...',
      createdAt: '2024-05-05',
      modifiedAt: '2024-05-05',
    },
    {
      id: 5,
      consumerName: 'Eve Brown',
      productName: 'Product E',
      rating: 5,
      headline: 'Excellent product!',
      comment: 'Lorem ipsum...',
      createdAt: '2024-05-06',
      modifiedAt: '2024-05-06',
    },
    {
      id: 6,
      consumerName: 'Charlie Davis',
      productName: 'Product F',
      rating: 1,
      headline: 'Terrible product',
      comment: 'Lorem ipsum...',
      createdAt: '2024-05-07',
      modifiedAt: '2024-05-07',
    },
    {
      id: 7,
      consumerName: 'Grace Miller',
      productName: 'Product G',
      rating: 4,
      headline: 'Good product!',
      comment: 'Lorem ipsum...',
      createdAt: '2024-05-08',
      modifiedAt: '2024-05-08',
    },
  ];

  // Add more review objects as neede

  reviewsPerPage: number = 5; // Default number of reviews per page
  currentPage: number = 1; // Current page number

  constructor() {}

  ngOnInit(): void {}

  editReview(review: Review) {
    // Implement edit functionality for the specific review
    console.log('Edit button clicked for:', review);
  }

  deleteReview(review: Review) {
    // Implement delete functionality for the specific review
    console.log('Delete button clicked for:', review);
  }

  getStarArray(rating: number): any[] {
    return Array.from({ length: rating }, (_, index) => index);
  }

  paginateReviews(page: number) {
    this.currentPage = page;
  }

  getPaginatedReviews(): Review[] {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    return this.reviewsData.slice(startIndex, endIndex);
  }
}
