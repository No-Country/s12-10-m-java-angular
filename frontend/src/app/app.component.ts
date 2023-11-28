import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./presentation/components/navbar/navbar.component";
import { LoginComponent } from './presentation/pages/login/login.component';
import { RegisterComponent } from './presentation/pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { ToastService } from './data/services/toast/Toast.service';
import { CatalogComponent } from "./presentation/pages/catalog/catalog.component";
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent, LoginComponent, CatalogComponent, NavbarComponent,NgxPaginationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ToastService]

})
export class AppComponent implements OnInit {
  
  
  constructor() {
    
  }

  ngOnInit(): void {

  }
  
}
