import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeService } from './_services/employee.service';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { appRoutes } from './routes';
import { EmployeeListResolver } from './_resolvers/employee-list-resolver';
import { HomeComponent } from './home/home.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { PreventUnsavedChangesAddEmpGuard } from './_guards/prevent-unsaved-changes-add-emp-guard';
import { PreventUnsavedChangesEditEmpGuard } from './_guards/prevent-unsaved-changes-edit-emp-guard';
import { EmployeeEditResolver } from './_resolvers/employee-edit-resolver';
import { AlertifyService } from './_services/alertify.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HomeComponent,
    CreateEmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ErrorInterceptorProvider,
    EmployeeListResolver,
    EmployeeEditResolver,
    EmployeeService,
    AlertifyService,
    PreventUnsavedChangesAddEmpGuard,
    PreventUnsavedChangesEditEmpGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
