import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./presentation/components/navbar/navbar.component";
import { LoginComponent } from './presentation/pages/login/login.component';
import { RegisterComponent } from './presentation/pages/register/register.component';
import { ToastService } from './data/services/toast/Toast.service';
import { NgxPaginationModule } from 'ngx-pagination';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent, LoginComponent, NavbarComponent,NgxPaginationModule],
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
