import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewComponent } from './review/review.component';
import { AddUserComponent } from './Users/add-user/add-user.component';
import { AllUsersComponent } from './Users/all-users/all-users.component';
import { AddCategoriesComponent } from './Categories/add-categories/add-categories.component';
import { AllCategoriesComponent } from './Categories/all-categories/all-categories.component';
import { AddSubcategoryComponent } from './Subcategories/add-subcategory/add-subcategory.component';
import { AllSubcategoriesComponent } from './Subcategories/all-subcategories/all-subcategories.component';
import { AddProductComponent } from './Products/add-product/add-product.component';
import { AllProductsComponent } from './Products/all-products/all-products.component';
import { AddOrderComponent } from './Orders/add-order/add-order.component';
import { AllOrdersComponent } from './Orders/all-orders/all-orders.component';

const routes: Routes = [
  // dashboard
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },

  // review
  { path: 'review', component: ReviewComponent },
  // user
  { path: 'add-user', component: AddUserComponent },
  { path: 'all-users', component: AllUsersComponent },

  // category
  { path: 'add-category', component: AddCategoriesComponent },
  { path: 'all-categories', component: AllCategoriesComponent },

  // sub category
  { path: 'add-subcategory', component: AddSubcategoryComponent },
  { path: 'all-subcategories', component: AllSubcategoriesComponent },
  // product
  { path: 'add-product', component: AddProductComponent },
  { path: 'all-products', component: AllProductsComponent },
  // order
  { path: 'add-order', component: AddOrderComponent },
  { path: 'all-orders', component: AllOrdersComponent },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (m) => m.DashboardRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
