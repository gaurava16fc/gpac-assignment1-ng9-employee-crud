import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from '../_models/employee.model';

@Pipe({
  name: 'employeeFilter',
  pure: false
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(employees: Employee[], searchValue: string): Employee[] {
    if (searchValue) {
      searchValue = searchValue.toLowerCase().trim();
      return employees.filter(el => el.name.toLowerCase().indexOf(searchValue) !== -1);
    }
    return employees;
  }
}
