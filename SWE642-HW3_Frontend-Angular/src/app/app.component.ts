import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home page for the angular app
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { 
  constructor(private router: Router) {}

  isHomePage(): boolean {
    return this.router.url === '/home';
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}