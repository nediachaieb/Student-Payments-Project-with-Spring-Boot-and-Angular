import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Home} from './home/home';
import {Login} from './login/login';
import {AdminTemplate} from './admin-template/admin-template';
import {Profile} from './profile/profile';
import {Dashboard} from './dashboard/dashboard';
import {Students} from './students/students';
import {Payments} from './payments/payments';
import {AuthGuard} from './guards/auth-guard';
import {AuthorizationGuard} from './guards/authorization.guard';
import {StudentDetails} from './student-details/student-details';
import {NewPayment} from './new-payment/new-payment';
import {PaymentDetails} from './payment-details/payment-details';
import {NewStudent} from './new-student/new-student';
import {EditStudent} from './edit-student/edit-student';
import {EditPayment} from './edit-payment/edit-payment';

const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },

  {
    path: 'admin',
    component: AdminTemplate,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'profile', component: Profile },
      { path: 'dashboard', component: Dashboard },
      { path: 'students', component: Students },
      { path: 'student-details/:code', component: StudentDetails },
      { path: 'payments', component: Payments },
      { path: 'new-payment/:studentCode', component: NewPayment },
      { path: 'payment-details/:id', component: PaymentDetails },
      { path: 'new-student', component: NewStudent },
      { path: 'edit-student/:code', component: EditStudent },
      { path: 'edit-payment/:id', component: EditPayment }
    ]
  },

  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
