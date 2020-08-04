import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Department } from 'src/app/_models/department.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiBaseUrl = '';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiBaseUrl = environment.apiBaseUrl + 'departments/';
  }

getDepartments(): Observable<Department[]> {
  return this.http.get<Department[]>(this.apiBaseUrl).pipe(
    catchError(this.handleError)
  );
}

  getDepartment(id: number): Observable<Department>  {
    return this.http.get<Department>(this.apiBaseUrl + id).pipe(
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


