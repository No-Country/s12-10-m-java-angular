import { Routes } from '@angular/router';
import { RegisterComponent } from '@presentation/pages/register/register.component';
import { ToastService } from './data/services/toast/Toast.service';
import { LoginService } from './data/services/login/login.service';
import { RegisterService } from './data/services/register/register.service';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('@presentation/pages/login/login.component').then(c => c.LoginComponent),
        providers: [ ToastService, LoginService ],
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('@presentation/pages/register/register.component').then(c => c.RegisterComponent),
        providers: [ ToastService, RegisterService ]
    },
    {
        path: 'forgot-password',
        title: 'Forgot Password',
        loadComponent: () => import('@presentation/pages/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
        providers: [ ToastService, LoginService ],
    },
    { 
        path: '**', 
        pathMatch: 'full',
        redirectTo: ''
    }
];
