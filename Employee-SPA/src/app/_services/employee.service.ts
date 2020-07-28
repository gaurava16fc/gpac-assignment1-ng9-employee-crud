import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Employee } from '../_models/employee.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiBaseUrl = '';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiBaseUrl = environment.apiBaseUrl + 'employees/';
  }

  // getEmployees(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.apiBaseUrl).pipe(
  //     catchError(this.handleError)
  //   );
  // }


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiBaseUrl).pipe(
      map(result => {
        console.log(result);
        let employeeList: Employee[] = [];
        for(let emp of result) {
          employeeList.push(new Employee(emp));
        }
        return employeeList;
      }),
      catchError(this.handleError)
    );
  }

  isLoggedUserWithAdminRole() {
    return this.authService.isLoggedUserWithAdminRole();
  }

  // getEmployee(id: number): Observable<Employee>  {
  //   return this.http.get<Employee>(this.apiBaseUrl + id).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  getEmployee(id: number): Observable<Employee>  {
    return this.http.get<Employee>(this.apiBaseUrl + id).pipe(
      map(result => {
        console.log(result);
        return new Employee(result);
      }),
      catchError(this.handleError)
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiBaseUrl, JSON.stringify(employee), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: number) {
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
