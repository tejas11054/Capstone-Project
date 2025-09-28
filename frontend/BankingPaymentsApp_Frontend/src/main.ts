// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@angular/localize/init';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    ...appConfig.providers 
  ]
})
.catch((err) => console.error(err));
