import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Employee } from 'src/app/_models/employee';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
    isEditMode = false;
    employee: Employee;
    subPostEmployeeAddition: Subscription;

    addEmpForm: FormGroup;

    constructor(
                  private formBuilder: FormBuilder,
                  private employeeService: EmployeeService,
                  private router: Router,
                  private route: ActivatedRoute
                ) { }

    ngOnInit() {
      this.addEmpForm = this.formBuilder.group({
        empname: ['', Validators.required],
        empsalary: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(7)]],
        empage: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
      });
    }

    addEmployee() {
      debugger;
      this.employee = new Employee();
      this.employee.name = this.addEmpForm.value.empname;
      this.employee.salary = this.addEmpForm.value.empsalary;
      this.employee.age = this.addEmpForm.value.empage;
      this.subPostEmployeeAddition = this.employeeService.addEmployee(this.employee).subscribe((data: {}) => {
        this.router.navigate(['employees'], {relativeTo: this.route});
      });
    }

    ngOnDestroy() {
      if (this.subPostEmployeeAddition) {
        this.subPostEmployeeAddition.unsubscribe();
      }
    }

    cancelEmployee() {
      this.router.navigate(['/employees'], {relativeTo: this.route});
    }

    onSubmitEmployee() {
      console.log('Inside onSubmitEmployee() method....');
      if (this.addEmpForm.invalid) {
        return;
      }
      this.addEmployee();
    }

    onUpdateEmployee() {
      console.log('Inside onUpdateEmployee() method....');
    }
  }
