import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Employee } from '../_models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiBaseUrl = '';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl + 'employees/';
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiBaseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getEmployee(id: number): Observable<Employee>  {
    return this.http.get<Employee>(this.apiBaseUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiBaseUrl, JSON.stringify(employee), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: number) {
    // console.log('Reached here at deleteEmployee() method.... URL: ' + this.apiBaseUrl + id);
    // return this.http.delete<Employee>(this.apiBaseUrl + id).subscribe((data) => {
    //   console.log('success' + data);
    // },
    // error => {
    //   this.handleError(error);
    // });

    return this.http.delete<Employee>(this.apiBaseUrl + id, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  updateEmployee(id: number, employee: Employee): Observable<Employee>  {
    return this.http.put<Employee>(this.apiBaseUrl + id, JSON.stringify(employee), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  // Error handling...
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
