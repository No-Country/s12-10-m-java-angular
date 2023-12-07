import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookDetail } from 'app/data/models/book';

@Component({
  selector: 'app-navbar-2',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-2.component.html',
  styleUrl: './navbar-2.component.css'
})
export class Navbar2Component implements OnInit {

  constructor(
    private router:Router
  ){}

  ngOnInit(): void {
    
  }

  search(q:any){
    console.log(q);
    // this.router.navigate("shop/+ ${q}]")
  }
}
