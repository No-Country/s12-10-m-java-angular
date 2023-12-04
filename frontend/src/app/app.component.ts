import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./presentation/components/navbar/navbar.component";
import { Navbar2Component } from "./presentation/components/navbar-2/navbar-2.component";
import { FooterComponent } from "./presentation/components/footer/footer.component";
import { LoginComponent } from './presentation/pages/login/login.component';
import { RegisterComponent } from './presentation/pages/register/register.component';
import { ToastService } from './data/services/toast/Toast.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShopComponent } from '@presentation/pages/shop/shop.component';
import { CartComponent } from '@presentation/pages/cart/cart.component';
import { LoggedInService } from './data/services/login/loggedIn.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [ToastService, LoggedInService],
    imports: [
        CommonModule,
        RouterOutlet,
        RegisterComponent,
        LoginComponent,
        NavbarComponent,
        NgxPaginationModule,
        FooterComponent,
        ShopComponent,
        CartComponent,
        Navbar2Component
    ]
})
export class AppComponent implements OnInit {
  
  
  constructor() {
    
  }

  ngOnInit(): void {

  }
  
}
