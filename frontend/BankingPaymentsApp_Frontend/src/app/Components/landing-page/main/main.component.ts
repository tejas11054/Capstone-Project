import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Hero } from '../hero/hero';
import { Features } from '../features/features';
import { Testimonials } from '../testimonials/testimonials';
import { Faq } from '../faq/faq';
import { Footer } from '../footer/footer';
import { QueryComponent } from '../query/query';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Hero,
    Features,
    Testimonials,
    Faq,
    QueryComponent,
    Footer
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']  
})
export class MainComponent {}
