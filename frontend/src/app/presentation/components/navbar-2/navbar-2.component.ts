import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookDetail } from 'app/data/models/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-2',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar-2.component.html',
  styleUrl: './navbar-2.component.css',
})
export class Navbar2Component implements OnInit {
  protected searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  search() {
    this.router.navigate(['/shop?search=' + this.searchTerm]);
  }
}
