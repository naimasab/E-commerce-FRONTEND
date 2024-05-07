import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categorysUrl = 'http://localhost:8087/catalog/categories'; // URL to web api
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
   * GET categorys from the server
   */
  getCategories(request:any): Observable<any[]> {
    const params = new HttpParams()
    .append('pageNumber', request.page)
    .append('pageSize', request.size)
    .append('field', request.field)
    .append('order', request.order);

    return this.http.get<any[]>
    ( this.categorysUrl,{ params:params,headers: this.httpOptions.headers })
      .pipe(
        tap(_ => this.log('fetched categories')),
        catchError(this.handleError<any []>('getCategories', []))
      );
  }

  /**
   * GET category by id
   * @param id The id of the category to retrieve
   */
  getCategory(id: number): Observable<Category> {
    const url = `${this.categorysUrl}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        tap(_ => this.log(`fetched category id=${id}`)),
        catchError(this.handleError<Category>(`getCategory id=${id}`))
      );
  }

  /**
   * POST: add a new category to the server
   * @param category The category data to add
   */
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categorysUrl, category, this.httpOptions)
      .pipe(
        tap((newCategory: Category) => this.log(`added category with id=${newCategory.id}`)),
        catchError(this.handleError<Category>('addCategory'))
      );
  }

  /**
   * PUT: update the category on the server
   * @param category The updated category data
   */
  updateCategory(category: Category): Observable<any> {
    return this.http.put(this.categorysUrl, category, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated category id=${category.id}`)),
        catchError(this.handleError<any>('updateCategory'))
      );
  }

  /**
   * DELETE: delete the category from the server
   * @param id The id of the category to delete
   */
  deleteCategory(id: number): Observable<Category> {
    const url = `${this.categorysUrl}/${id}`;
    return this.http.delete<Category>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted category id=${id}`)),
        catchError(this.handleError<Category>('deleteCategory'))
      );
  }

  /**
   * GET categorys whose name contains the search term
   * @param term The search term
   */
  searchCategorys(term: string): Observable<Category[]> {
    if (!term.trim()) {
      // If no search term, return an empty category array
      return of([]);
    }
    return this.http.get<Category[]>(`${this.categorysUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ? this.log(`found categorys matching "${term}"`) : this.log(`no categorys matching "${term}"`)),
        catchError(this.handleError<Category[]>('searchCategorys', []))
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
    console.log(`CategoryService: ${message}`);
  }
}