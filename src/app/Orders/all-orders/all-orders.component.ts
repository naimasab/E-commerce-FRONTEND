import { Component } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
})
export class AllOrdersComponent {
  orderId: string;
  userId: string;
  orderDate: string;
  updatedDate: string;
  orderStatus: string;
  orderItems: any[];
  shipping: any; // Assuming shipping details are provided

  constructor() {
    // Sample data for demonstration
    this.orderId = '12345';
    this.userId = '6789';
    this.orderDate = '2024-05-06';
    this.updatedDate = '2024-05-06';
    this.orderStatus = 'Processing';

    // Sample order items
    this.orderItems = [
      { name: 'Product 1', quantity: 2, price: 10 },
      { name: 'Product 2', quantity: 1, price: 20 },
      { name: 'Product 3', quantity: 3, price: 15 },
    ];

    // Sample shipping details
    this.shipping = {
      address: '123 Shipping St',
      city: 'Shipping City',
      country: 'Shipping Country',
      postalCode: '12345',
    };
  }
}
