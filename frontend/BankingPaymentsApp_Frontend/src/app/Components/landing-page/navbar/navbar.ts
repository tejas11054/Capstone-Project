import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css', '../landing.css'],
  encapsulation: ViewEncapsulation.None  
})
export class Navbar {

}
