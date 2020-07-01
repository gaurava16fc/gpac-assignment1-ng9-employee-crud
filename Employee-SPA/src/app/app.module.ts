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
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
