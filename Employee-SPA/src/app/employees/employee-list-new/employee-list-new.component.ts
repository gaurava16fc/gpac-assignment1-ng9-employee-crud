import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from 'src/app/_models/employee.model';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-employee-list-new',
  templateUrl: './employee-list-new.component.html',
  styleUrls: ['./employee-list-new.component.css']
})
export class EmployeeListNewComponent implements OnInit , OnDestroy {
  employees: Employee[];
  // noDataFound = false;
  searchByEmpName: string;
  routeDataSub: Subscription;
  deleteEmployeeSub: Subscription;

  constructor(
        private route: ActivatedRoute,
        private alertify: AlertifyService,
        private employeeService: EmployeeService,
        private router: Router
    ) { }

  ngOnInit() {
    // // console.log('Inside ngOnInit()....');
    this.searchByEmpName = '';
    // this.noDataFound = false;
    this.routeDataSub = this.route.data.subscribe(data => {
        this.employees = data['employees'];
      });
  }

  ngOnDestroy() {
    if (this.routeDataSub) {
      this.routeDataSub.unsubscribe();
    }

    if (this.deleteEmployeeSub) {
      this.deleteEmployeeSub.unsubscribe();
    }
  }

  onDeleteEmployee(id: number) {
    this.alertify.confirm('Are you sure you want to delete an employee with Id # ' + id + '?', () => {
      // console.log('Deleted# ' + id);
      this.deleteEmployeeSub = this.employeeService.deleteEmployee(id).subscribe((data) => {
          // console.log('success' + data);
          this.alertify.success('Employee Id# {' + id + '} has been deleted successfully!');
          // this.router.navigate(['employees'], { relativeTo: this.route});
          this.refreshData();
        },
        error => {
          this.alertify.error(error);
        });
    });
  }

  onShowEmployeeList() {
    this.refreshData();
  }

  refreshData() {
    this.getEmployeeLists().subscribe((data: Employee[]) => {
      this.employees = data;
      // this.noDataFound = false;
    });
  }

  getEmployeeLists(): Observable<Employee[]> {
    return this.employeeService.getEmployees().pipe(
      catchError(error => {
          this.alertify.error('Problem retrieving data at Employee List');
          return of(null);
      })
    );
  }
}
