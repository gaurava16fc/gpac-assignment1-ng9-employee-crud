import { Routes } from '@angular/router';

import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeListResolver } from './_resolvers/employee-list-resolver';
import { HomeComponent } from './home/home.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { PreventUnsavedChangesAddEmpGuard } from './_guards/prevent-unsaved-changes-add-emp-guard';
import { PreventUnsavedChangesEditEmpGuard } from './_guards/prevent-unsaved-changes-edit-emp-guard';
import { EmployeeEditResolver } from './_resolvers/employee-edit-resolver';
import { PageNotFoundComponent } from './_404/page-not-found/page-not-found.component';
import { EmployeeListNewComponent } from './employees/employee-list-new/employee-list-new.component';
import { AuthGuard } from './_guards/auth.guard';

import { AuthAdminRoleGuard } from './_guards/auth-admin-role.guard';
import { CreateEmployeeNewComponent } from './employees/create-employee-new/create-employee-new.component';

export const appRoutes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'signin', component: SignInComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            // { path: 'employees', component: EmployeeListComponent, resolve: {employees: EmployeeListResolver} },
            { path: 'employees', component: EmployeeListNewComponent, resolve: {employees: EmployeeListResolver} },
            { path: 'addemployee', component: CreateEmployeeNewComponent,
                canDeactivate: [PreventUnsavedChangesAddEmpGuard], canActivate: [AuthAdminRoleGuard],
                runGuardsAndResolvers: 'always'
            },
            { path: 'employees/edit/:id', component: CreateEmployeeNewComponent, resolve: {employees: EmployeeEditResolver},
                canDeactivate: [PreventUnsavedChangesEditEmpGuard] },
        ]
    },
    // { path: '**', redirectTo: '', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];
