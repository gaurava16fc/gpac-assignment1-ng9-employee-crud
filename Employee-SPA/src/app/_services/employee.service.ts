import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Employee } from 'src/app/_models/employee.model';
import { AuthService } from 'src/app/_services/auth.service';

import { DepartmentService } from 'src/app/_services/department.service';
import { Department } from 'src/app/_models/department.model';
import { FacilityService } from 'src/app/_services/facility.service';
import { Facility } from 'src/app/_models/facility.model';

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

  constructor(
        private http: HttpClient,
        private authService: AuthService,
        private depttService: DepartmentService,
        private facilityService: FacilityService
    ) {
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
        // console.log(result);
        let employeeList: Employee[] = [];
        for(let emp of result) {
          // employeeList.push(new Employee(emp));
          employeeList.push(emp);
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
        // console.log(result);
        // return new Employee(result);
        let emp = new Employee();
        emp = result;
        return emp;
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

  getDepartments(): Observable<Department[]> {
    return this.depttService.getDepartments().pipe(
      catchError(this.handleError)
    );
  }

  getFacilities(): Observable<Facility[]> {
    return this.facilityService.getFacilities().pipe(
      catchError(this.handleError)
    );
  }

  setMainPhoto(employeeId: number, photoId: number) {
    const setMainUrl = this.apiBaseUrl + employeeId + '/photos/' + photoId + '/setMain';
    return this.http.post(setMainUrl, {} );
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
