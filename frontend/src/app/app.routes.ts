import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('@presentation/pages/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('@presentation/pages/register/register.component').then(c => c.RegisterComponent)
    },
    { 
        path: '**', 
        pathMatch: 'full',
        redirectTo: ''
    }
];
