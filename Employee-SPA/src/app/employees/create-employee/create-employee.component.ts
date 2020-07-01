import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Employee } from 'src/app/_models/employee';
import { EmployeeService } from 'src/app/_services/employee.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
    _headerTitle: string = 'Create Employee';
    isEditMode = false;
    _employeeId: number;
    employee: Employee;
    subPostEmployeeAddition: Subscription;
    subPostEmployeeEdit: Subscription;

    addEmpForm: FormGroup;

    constructor(
                  private formBuilder: FormBuilder,
                  private employeeService: EmployeeService,
                  private router: Router,
                  private route: ActivatedRoute,
                  private alertify: AlertifyService
                ) {
                  this.employee = new Employee();
                  this._headerTitle = 'Create Employee';
                  this.isEditMode = false;
                  this._employeeId = 0;
                }

    ngOnInit() {
      this._headerTitle = 'Create Employee';
      this.isEditMode = false;
      this._employeeId = 0;
      this.addEmpForm = this.formBuilder.group({
        empid: [''],
        empname: ['', Validators.required],
        empsalary: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(7)]],
        empage: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
      });

      const empid = +this.route.snapshot.params['id'];
      if (empid > 0) {
        this._employeeId = empid;
        this.employeeService.getEmployee(empid).subscribe((empData: Employee) => {
          this.employee = empData;
        }, error => {
          this.alertify.error(error);
        });
        this._headerTitle = 'Edit Employee';
        this.isEditMode = true;
      }
    }

    private fillFormDataToEmployeeObject(): void {
      if (this.addEmpForm.invalid) {
        return;
      }
      if (this.isEditMode) {
        this.employee.id = this.addEmpForm.value.empid;
      }
      this.employee.name = this.addEmpForm.value.empname;
      this.employee.salary = this.addEmpForm.value.empsalary;
      this.employee.age = this.addEmpForm.value.empage;
    }

    private addEmployee() {
      this.fillFormDataToEmployeeObject();
      this.subPostEmployeeAddition = this.employeeService.addEmployee(this.employee).subscribe((data: {}) => {
        this.alertify.success('New employee saved sucessfully.');
        this.addEmpForm.reset();
        this.router.navigate(['/employees']);
      });
    }

    ngOnDestroy() {
      if (this.subPostEmployeeAddition) {
        this.subPostEmployeeAddition.unsubscribe();
      }
      if (this.subPostEmployeeEdit) {
        this.subPostEmployeeEdit.unsubscribe();
      }
    }

    cancelEmployee() {
      this.router.navigate(['/employees']);
    }

    onSubmitEmployee() {
      if (this.addEmpForm.invalid) {
        this.alertify.message('Invalid Form , Status: ' + this.addEmpForm.valid);
        return;
      }
      if (!this.isEditMode) {
        this.addEmployee();
      }
    }

    onUpdateEmployee() {
      if (this.addEmpForm.invalid) {
        this.alertify.message('Invalid Form , Status: ' + this.addEmpForm.valid);
        return;
      }
      if (this.isEditMode) {
          this.fillFormDataToEmployeeObject();
          this.subPostEmployeeEdit = this.employeeService.updateEmployee(this._employeeId, this.employee)
            .subscribe((data: {}) => {
              this.alertify.success('Employee data is updated sucessfully.');
              this.addEmpForm.reset();
              this.router.navigate(['/employees']);
            });
      }
    }
  }
