import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:8087/catalog/products'; // URL to web api
  private token: string | null = null;

  constructor(private http: HttpClient) {
    // Fetch the token from a secure source (e.g., local storage)
    this.token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLaGF0bWkwNCIsImlzcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MTQ4NTE3MzgsImV4cCI6MTcxNDg1NTMzOH0.6H8ZadZ2MTU_TFOTqniIxq8E3IDYxw7y4Zf0qzUTTZg";
  }

  get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token ? `Bearer ${this.token}` : ''
      })
    };
  }

  /**
   * GET products from the server
   */
  getProducts(request:any): Observable<any[]> {
    const params = new HttpParams()
    .append('pageNumber', request.page)
    .append('pageSize', request.size)
    .append('field', request.field)
    .append('order', request.order);

    return this.http.get<any[]>
    ( this.productsUrl,{ params:params,headers: this.httpOptions.headers })
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<any []>('getProducts', []))
      );
  }

  /**
   * GET product by id
   * @param id The id of the product to retrieve
   */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap(_ => this.log(`fetched product id=${id}`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  /**
   * POST: add a new product to the server
   * @param product The product data to add
   */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions)
      .pipe(
        tap((newProduct: Product) => this.log(`added product with id=${newProduct.id}`)),
        catchError(this.handleError<Product>('addProduct'))
      );
  }

  /**
   * PUT: update the product on the server
   * @param product The updated product data
   */
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl, product, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated product id=${product.id}`)),
        catchError(this.handleError<any>('updateProduct'))
      );
  }

  /**
   * DELETE: delete the product from the server
   * @param id The id of the product to delete
   */
  deleteProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted product id=${id}`)),
        catchError(this.handleError<Product>('deleteProduct'))
      );
  }

  /**
   * GET products whose name contains the search term
   * @param term The search term
   */
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // If no search term, return an empty product array
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ? this.log(`found products matching "${term}"`) : this.log(`no products matching "${term}"`)),
        catchError(this.handleError<Product[]>('searchProducts', []))
      );
  }

  /**
   * Handle HTTP operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error.message); // Log to console for now

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  /**
   * Log the operation to the console
   * @param message The message to log
   */
  private log(message: string) {
    console.log(`ProductService: ${message}`);
  }
}