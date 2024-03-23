import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('INTERCEPT');
  const idToken = localStorage.getItem('jwt');
  console.log('INTERCEPT');
  if (idToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + idToken),
    });

    return next(cloned);
  } else {
    return next(req);
  }
};
