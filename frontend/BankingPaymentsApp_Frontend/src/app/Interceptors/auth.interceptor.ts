import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);

  const token = authService.getToken();

  if(token){
    const cloned = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  console.log("NO token found, skipping with header");
  return next(req);
};
