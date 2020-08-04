import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Employee } from 'src/app/_models/employee.model';
// import { Photo } from 'src/app/_models/photo.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-create-employee-new',
  templateUrl: './create-employee-new.component.html',
  styleUrls: ['./create-employee-new.component.css']
})
export class CreateEmployeeNewComponent implements OnInit, OnDestroy {
    headerTitleNew: string = 'Create Employee (New)';
    headerTitleEdit: string = 'Edit Employee (New)';
    headerTitle: string = this.headerTitleNew;
    isEditMode = false;
    employeeId: number;
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
                  this.headerTitle = this.headerTitleNew;
                  this.isEditMode = false;
                  this.employeeId = 0;
                }

    ngOnInit() {
      this.headerTitle = this.headerTitleNew;
      this.isEditMode = false;
      this.employeeId = 0;
      this.addEmpForm = this.formBuilder.group({
        // empid: [''],
        empname: ['', Validators.required],
        empsalary: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
        // empage: [''],
        empcity: [''],
        empcountry: [''],
        empemail: ['', [Validators.required, Validators.email]],
        empphone: ['', Validators.required],
        empgender: ['', Validators.required],
        empdob: ['', Validators.required],
        empdoj: [''],
        photos: this.formBuilder.array([])
      });

      const empid = +this.route.snapshot.params['id'];
      if (empid > 0) {
        this.employeeId = empid;
        this.employeeService.getEmployee(empid).subscribe((empData: Employee) => {
          this.employee = empData;
          console.log(this.employee);
        }, error => {
          this.alertify.error(error);
        });
        this.headerTitle = this.headerTitleEdit;
        this.isEditMode = true;
      }
    }

    private fillFormDataToEmployeeObject(): void {
      if (this.addEmpForm.invalid) {
        return;
      }
      if (this.isEditMode) {
        // this.employee.id = +this.addEmpForm.value.empid;
      }
      this.employee.name = this.addEmpForm.value.empname;
      this.employee.salary = +this.addEmpForm.value.empsalary;
      this.employee.dateOfBirth = this.addEmpForm.value.empdob;
      this.employee.dateOfJoining = this.addEmpForm.value.empdoj;
      this.employee.gender = this.addEmpForm.value.empgender;
      this.employee.phoneNumber = this.addEmpForm.value.empphone;
      this.employee.email = this.addEmpForm.value.empemail;
      // this.employee.departmentId = +this.addEmpForm.value.empdepartmentId;
      this.employee.city = this.addEmpForm.value.empcity;
      this.employee.country = this.addEmpForm.value.empcountry;
      // this.employee.facilityId = +this.addEmpForm.value.empfacilityId;
      // this.employee.photoUrl = this.addEmpForm.value.empphotoUrl;



      // this.employee.age = +this.addEmpForm.value.empage;
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
          this.subPostEmployeeEdit = this.employeeService.updateEmployee(this.employeeId, this.employee)
            .subscribe((data: {}) => {
              this.alertify.success('Employee data is updated sucessfully.');
              this.addEmpForm.reset();
              this.router.navigate(['/employees']);
            });

          // console.log(this.employee);
      }
    }

    updateMainPhoto(empPhotoUrl: string) {
      this.employee.photoUrl = empPhotoUrl;
    }
  }
