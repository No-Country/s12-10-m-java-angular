import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./presentation/pages/login/login.component').then(c => c.LoginComponent)
    },
    { 
        path: '**', 
        pathMatch: 'full',
        redirectTo: 'login'
    }
];
