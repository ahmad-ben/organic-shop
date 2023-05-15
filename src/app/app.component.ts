import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BsNavbarComponent } from './core/components/bs-navbar/bs-navbar.component';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    BsNavbarComponent
  ],
})

export class AppComponent {
  title = 'organic-store';
}
