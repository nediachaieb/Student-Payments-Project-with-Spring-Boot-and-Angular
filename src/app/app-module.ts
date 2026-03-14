import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
//
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AdminTemplate } from './admin-template/admin-template';
import { Dashboard } from './dashboard/dashboard';
import { Home } from './home/home';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Payments } from './payments/payments';
import { Students } from './students/students';
import { LoadStudents } from './load-students/load-students';
import { LoadPayments } from './load-payments/load-payments';
// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {AuthGuard} from './guards/auth-guard';
import {AuthorizationGuard} from './guards/authorization.guard';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    App,
    AdminTemplate,
    Dashboard,
    Home,
    Login,
    Profile,
    Payments,
    Students,
    LoadStudents,
    LoadPayments
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Angular Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),AuthGuard,AuthorizationGuard
  ],
  bootstrap: [App]
})
export class AppModule { }
