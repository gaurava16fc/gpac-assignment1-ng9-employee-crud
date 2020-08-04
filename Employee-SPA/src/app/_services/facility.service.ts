import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';


import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Facility } from 'src/app/_models/facility.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private apiBaseUrl = '';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiBaseUrl = environment.apiBaseUrl + 'facilities/';
  }

getFacilities(): Observable<Facility[]> {
  return this.http.get<Facility[]>(this.apiBaseUrl).pipe(
    catchError(this.handleError)
  );
}

  getFacility(id: number): Observable<Facility>  {
    return this.http.get<Facility>(this.apiBaseUrl + id).pipe(
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
