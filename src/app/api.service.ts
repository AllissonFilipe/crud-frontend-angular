import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/api/v1/products';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl)
      .pipe(
        tap(user => console.log('fetched products')),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(apiUrl, user, httpOptions).pipe(
      tap((prod: any) => console.log(`added user w/ id=${prod._id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser(id: any, user: User): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => console.log(`updated user id=${id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(id: any): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
