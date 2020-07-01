import { Routes } from '@angular/router';

import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeListResolver } from './_resolvers/employee-list-resolver';
import { HomeComponent } from './home/home.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        children: [
            { path: 'employees', component: EmployeeListComponent, resolve: {employees: EmployeeListResolver} },
            { path: 'addemployee', component: CreateEmployeeComponent }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
