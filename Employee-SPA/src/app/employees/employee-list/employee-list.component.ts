import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Employee } from 'src/app/_models/employee';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[];
  routeDataSub: Subscription;
  deleteEmployeeSub: Subscription;

  constructor(
        private route: ActivatedRoute,
        private alertify: AlertifyService,
        private employeeService: EmployeeService,
        private router: Router
    ) { }

  ngOnInit() {
    // console.log('Inside ngOnInit()....');
    this.routeDataSub = this.route.data.subscribe(data => {
      console.log(data);
      this.employees = data['employees'];
       console.log(this.employees);
      });
  }

  ngOnDestroy() {
    // if (this.routeDataSub) {
    //   this.routeDataSub.unsubscribe();
    // }

    // if (this.deleteEmployeeSub) {
    //   this.deleteEmployeeSub.unsubscribe();
    // }
  }

  onDeleteEmployee(id: number) {
    this.alertify.confirm('Do you want to delete this employee?', () => {
      // console.log('Deleted# ' + id);
      this.deleteEmployeeSub = this.employeeService.deleteEmployee(id).subscribe((data) => {
          // console.log('success' + data);
          this.alertify.success('Employee Id# {' + id + '} has been deleted successfully!');
          this.router.navigate(['employees'], {relativeTo: this.route});
        },
        error => {
          this.alertify.error(error);
        });
    });
  }

  onShowEmployeeList() {
    this.router.navigate([''], {relativeTo: this.route});
  }
}
