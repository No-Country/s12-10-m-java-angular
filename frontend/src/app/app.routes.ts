import { Routes } from '@angular/router';
import { RegisterComponent } from '@presentation/pages/register/register.component';
import { ToastService } from './data/services/toast/Toast.service';
import { LoginService } from './data/services/login/login.service';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('@presentation/pages/login/login.component').then(c => c.LoginComponent),
        providers: [ ToastService, LoginService ]
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
