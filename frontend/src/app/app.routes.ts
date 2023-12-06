import { Routes } from '@angular/router';
import { ToastService } from './data/services/toast/Toast.service';
import { LoginService } from './data/services/login/login.service';
import { RegisterService } from './data/services/register/register.service';
import { BookDetailCardComponent } from '@presentation/components/book-detail-card/book-detail-card.component';
import { ShopService } from './data/services/shop/shop.service';


export const routes: Routes = [
    {
        path: '',
        title: 'Books Leaks - Home page',
        loadComponent: ()=> import('@presentation/pages/home/home.component').then(c => c.HomeComponent),
    },
    {
        path: 'login',
        title: 'Books Leaks - Login Page',
        loadComponent: () => import('@presentation/pages/login/login.component').then(c => c.LoginComponent),
        providers: [LoginService],
    },
    {
        path: 'register',
        title: 'Books Leaks - Register page',
        loadComponent: () => import('@presentation/pages/register/register.component').then(c => c.RegisterComponent),
        providers: [RegisterService ]
    },
    {
        path: 'shop/:searchTerm',
        title: 'Books Leaks - Shop page',
        loadComponent: () => import('@presentation/pages/shop/shop.component').then(c => c.ShopComponent),
        providers: [ ShopService ]
    },
    {
        path: 'cart',
        title: 'Books Leaks - Cart page',
        loadComponent: () => import('@presentation/pages/cart/cart.component').then(c => c.CartComponent),
    },
    {
        path: 'forgot-password',
        title: 'Books Leaks - Forgot Password page',
        loadComponent: () => import('@presentation/pages/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
        providers: [LoginService ],
    },
    {
        path: 'Cart',
        title: 'Cart',
        loadComponent: ()=> import('@presentation/pages/cart/cart.component').then(c => c.CartComponent),
    },
    {
        path: 'book/:id',
        title: 'Detail Book',
        loadComponent: () => import('@presentation/components/book-detail-card/book-detail-card.component').then(c => c.BookDetailCardComponent),
        providers: [BookDetailCardComponent ],
    },
    {
        path: '404',
        title: 'Page Not Found',
        loadComponent: () => import('@presentation/pages/not-found/not-found.component').then(c => c.NotFoundComponent),
    },
    { path: '**', redirectTo: '/404' }
];
