import { Routes } from '@angular/router';
import { RegisterComponent } from '@presentation/pages/register/register.component';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('@presentation/pages/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    { 
        path: '**', 
        pathMatch: 'full',
        redirectTo: ''
    }
];
