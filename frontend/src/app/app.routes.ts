import { Routes } from '@angular/router';
import { RegisterComponent } from './presentation/pages/register/register.component';

export const routes: Routes = [
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
