import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:8086/users/'; // URL to web api
  private token: string | null = null;

  constructor(private http: HttpClient) {
    // Fetch the token from a secure source (e.g., local storage)
    this.token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLaGF0bWkwNCIsImlzcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE3MTQ5OTMxOTIsImV4cCI6MTcxNDk5Njc5Mn0.EM-aqIKx3bJ-2FaaI3Xkn4XT0r5_T3rlNmrBAFSDXPQ";
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
   * GET users from the server
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  /**
   * GET user by id
   * @param id The id of the user to retrieve
   */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /**
   * POST: add a new user to the server
   * @param user The user data to add
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions)
      .pipe(
        tap((newUser: User) => this.log(`added user with id=${newUser.id}`)),
        catchError(this.handleError<User>('addUser'))
      );
  }

  /**
   * PUT: update the user on the server
   * @param user The updated user data
   */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated user id=${user.id}`)),
        catchError(this.handleError<any>('updateUser'))
      );
  }

  /**
   * DELETE: delete the user from the server
   * @param id The id of the user to delete
   */
  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted user id=${id}`)),
        catchError(this.handleError<User>('deleteUser'))
      );
  }

  /**
   * GET users whose name contains the search term
   * @param term The search term
   */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // If no search term, return an empty user array
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ? this.log(`found users matching "${term}"`) : this.log(`no users matching "${term}"`)),
        catchError(this.handleError<User[]>('searchUsers', []))
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
    console.log(`UserService: ${message}`);
  }
}