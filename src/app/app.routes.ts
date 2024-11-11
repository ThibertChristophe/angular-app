import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

import { ContactComponent } from './components/contact/contact.component';
import { Error404Component } from './components/404/404.component';
import { LoginComponent } from './components/login/login.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
    //canActivate: [authGuard],
  },
  {
    path: 'admin/booking',
    component: BookingListComponent,
    title: 'Booking',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact',
  },
  {
    path: '404',
    component: Error404Component,
    title: '404',
  },
];
