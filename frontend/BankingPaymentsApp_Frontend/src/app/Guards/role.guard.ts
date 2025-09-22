import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const expectedRole = route.data?.['role'];
  const userRole = auth.getUserRole();
  if (auth.isLoggedIn() && userRole == expectedRole) return true;
  return false;
  //i can just redirect to /no-access page where i shows you tried to access restricted info;
};
