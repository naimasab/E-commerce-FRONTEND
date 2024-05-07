import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { AllUsersComponent } from './Users/all-users/all-users.component';
import { AllCategoriesComponent } from './Categories/all-categories/all-categories.component';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { AllProductsComponent } from './Products/all-products/all-products.component';
import { ReviewComponent } from './review/review.component'; // Import ReviewComponent
import { StarRatingPipe } from './review/star-rating.pipe';
import { AddOrderComponent } from './Orders/add-order/add-order.component';
import { AllOrdersComponent } from './Orders/all-orders/all-orders.component';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    AllUsersComponent,
    AllCategoriesComponent,
    PaginationComponent,
    AllProductsComponent,
    ReviewComponent,
    StarRatingPipe,
    AddOrderComponent,
    AllOrdersComponent, // Add ReviewComponent to declarations array
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    DashboardRoutingModule,
    CommonModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent],
})
export class AppModule {}
