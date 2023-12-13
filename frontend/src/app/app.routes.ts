import { Params, Routes } from '@angular/router';
import { ToastService } from './data/services/toast/Toast.service';
import { LoginService } from './data/services/login/login.service';
import { RegisterService } from './data/services/register/register.service';
import { ShopService } from './data/services/shop/shop.service';
import { BookDetailComponent } from '@presentation/pages/book-detail/book-detail.component';
import { BooksService } from './data/services/books/books.service';
import { bookDetailResolver } from './data/guards/BookDetail.resolver';
import { FilterService } from './data/services/shop/filter.service';


export const routes: Routes = [
  {
    path: '',
    title: 'Books Leaks - Home page',
    loadComponent: () =>
      import('@presentation/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'login',
    title: 'Books Leaks - Login Page',
    loadComponent: () =>
      import('@presentation/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
    providers: [LoginService],
  },
  {
    path: 'register',
    title: 'Books Leaks - Register page',
    loadComponent: () =>
      import('@presentation/pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    providers: [RegisterService],
  },
  {
    path: 'shop',
    title: 'Books Leaks - Shop page',
    loadComponent: () =>
      import('@presentation/pages/shop/shop.component').then(
        (c) => c.ShopComponent
      ),
    providers: [ShopService, FilterService],
    data: { preload: true },
  },
  {
    path: 'cart',
    title: 'Books Leaks - Cart page',
    loadComponent: () =>
      import('@presentation/pages/cart/cart.component').then(
        (c) => c.CartComponent
      ),
  },
  {
    path: 'forgot-password',
    title: 'Books Leaks - Forgot Password page',
    loadComponent: () =>
      import(
        '@presentation/pages/forgot-password/forgot-password.component'
      ).then((c) => c.ForgotPasswordComponent),
    providers: [LoginService],
  },
  {
    path: 'book/:id',
    title: 'Books Leaks - Detail Book page',
    loadComponent: () =>
      import('@presentation/pages/book-detail/book-detail.component').then(
        (c) => c.BookDetailComponent
      ),
    providers: [BooksService],
    data: { preload: true },
    resolve: {
      book: bookDetailResolver,
    },
  },
  {
    path: 'admin',
    loadComponent: () => import('@presentation/pages/panel/panel.component').then(
      (c) => c.PanelComponent
    ),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        title: 'Books Leaks - Dashboard',
        loadComponent: () => import('@presentation/pages/panel/layouts/dashboard/dashboard.component').then(
          (c)=> c.DashboardComponent
        )
      },
      {
        path: 'books',
        title: 'Books Leaks - Admin books',
        loadComponent: () => import('@presentation/pages/panel/layouts/admin-books/admin-books.component').then(
          (c)=> c.AdminBooksComponent
        )
      }
    ]
  },
  {
    path: '404',
    title: 'Page Not Found',
    loadComponent: () =>
      import('@presentation/pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
  { path: '**', redirectTo: '/404' },
];
