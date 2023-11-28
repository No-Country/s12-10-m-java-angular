import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './presentation/pages/login/login.component';
import { RegisterComponent } from './presentation/pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from '@presentation/components/toast/toast.component';
import { ToastService } from './data/services/toast/Toast.service';
import { CatalogComponent } from "./presentation/pages/catalog/catalog.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterComponent, LoginComponent, CatalogComponent],
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
