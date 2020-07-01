import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class EmployeeEditResolver implements Resolve<Employee> {
    constructor(private employeeService: EmployeeService, private alertify: AlertifyService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Employee> {
        return this.employeeService.getEmployee(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Edit Employee - [Id# ' + route.params['id'] + ']: Problem retrieving relevant data');
                return of(null);
            })
        );
    }
}