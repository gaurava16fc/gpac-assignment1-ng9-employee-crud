import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import { CreateEmployeeComponent } from '../employees/create-employee/create-employee.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesAddEmpGuard implements CanDeactivate<CreateEmployeeComponent> {
  canDeactivate(component: CreateEmployeeComponent) {
    if (component.addEmpForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost!');
    }
    return true;
  }
}
