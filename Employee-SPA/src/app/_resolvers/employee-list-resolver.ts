import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class EmployeeListResolver implements Resolve<Employee[]> {
    constructor(private employeeService: EmployeeService, private alertify: AlertifyService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Employee[]> {
        return this.employeeService.getEmployees().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data at Employee List');
                return of(null);
            })
        );
    }
}