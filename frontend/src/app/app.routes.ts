import { Routes } from '@angular/router';
import { ToastService } from './data/services/toast/Toast.service';
import { LoginService } from './data/services/login/login.service';
import { RegisterService } from './data/services/register/register.service';

export const routes: Routes = [
    {
        path: '',
        title: 'Books Leaks - Home page',
        loadComponent: ()=> import('@presentation/pages/home/home.component').then(c => c.HomeComponent),
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('@presentation/pages/login/login.component').then(c => c.LoginComponent),
        providers: [LoginService],
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('@presentation/pages/register/register.component').then(c => c.RegisterComponent),
        providers: [RegisterService ]
    },
    {
        path: 'forgot-password',
        title: 'Forgot Password',
        loadComponent: () => import('@presentation/pages/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
        providers: [LoginService ],
    },
    {
        path: '404',
        title: 'Page Not Found',
        loadComponent: () => import('@presentation/pages/not-found/not-found.component').then(c => c.NotFoundComponent),
    },
    { path: '**', redirectTo: '/404' }
];
