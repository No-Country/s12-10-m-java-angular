import { Routes } from '@angular/router';
import { ToastService } from './data/services/toast/Toast.service';
import { LoginService } from './data/services/login/login.service';
import { RegisterService } from './data/services/register/register.service';
import { CatalogComponent } from './presentation/pages/catalog/catalog.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        loadComponent: ()=> import('@presentation/pages/home/home.component').then(c => c.HomeComponent),
    },
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
        path: 'catalog', 
        component: CatalogComponent,
    },
];
