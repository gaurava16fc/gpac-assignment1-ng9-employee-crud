import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { JwtModule } from '@auth0/angular-jwt';
import { FileUploadModule } from 'ng2-file-upload';


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
import { AuthService } from './_services/auth.service';
import { PageNotFoundComponent } from './_404/page-not-found/page-not-found.component';
import { SearchPanelComponent } from './employees/search-panel/search-panel.component';
import { StrictNumericDigtsDirective } from './_directives/strict-numeric-digts.directive';
import { StrictNumericDecimalDigtsDirective } from './_directives/strict-numeric-decimal-digts.directive';
import { EmployeeFilterPipe } from './_pipes/employee-filter.pipe';
import { EmployeeListNewComponent } from './employees/employee-list-new/employee-list-new.component';
import { NavigationComponent } from './navigation/navigation.component';
import { environment } from 'src/environments/environment';
import { AuthGuard } from './_guards/auth.guard';
import { CreateEmployeeNewComponent } from './employees/create-employee-new/create-employee-new.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PhotoEditorComponent } from './employees/photo-editor/photo-editor.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HomeComponent,
    CreateEmployeeComponent,
    PageNotFoundComponent,
    SearchPanelComponent,
    StrictNumericDigtsDirective,
    StrictNumericDecimalDigtsDirective,
    EmployeeFilterPipe,
    EmployeeListNewComponent,
    NavigationComponent,
    CreateEmployeeNewComponent,
    SignInComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FileUploadModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.whiteListedDomains,
        disallowedRoutes: environment.blackListedRoutes
      }
    })
  ],
  providers: [
    ErrorInterceptorProvider,
    EmployeeListResolver,
    EmployeeEditResolver,
    EmployeeService,
    AlertifyService,
    AuthService,
    AuthGuard,
    PreventUnsavedChangesAddEmpGuard,
    PreventUnsavedChangesEditEmpGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
