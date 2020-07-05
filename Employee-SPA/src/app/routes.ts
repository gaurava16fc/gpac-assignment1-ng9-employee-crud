import { Routes } from '@angular/router';

import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeListResolver } from './_resolvers/employee-list-resolver';
import { HomeComponent } from './home/home.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { PreventUnsavedChangesAddEmpGuard } from './_guards/prevent-unsaved-changes-add-emp-guard';
import { PreventUnsavedChangesEditEmpGuard } from './_guards/prevent-unsaved-changes-edit-emp-guard';
import { EmployeeEditResolver } from './_resolvers/employee-edit-resolver';
import { PageNotFoundComponent } from './_404/page-not-found/page-not-found.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        children: [
            { path: 'employees', component: EmployeeListComponent, resolve: {employees: EmployeeListResolver} },
            { path: 'addemployee', component: CreateEmployeeComponent,
                canDeactivate: [PreventUnsavedChangesAddEmpGuard] },
            { path: 'employees/:id', component: CreateEmployeeComponent, resolve: {employees: EmployeeEditResolver},
                canDeactivate: [PreventUnsavedChangesEditEmpGuard] },
        ]
    },
    // { path: '**', redirectTo: '', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];
