import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  console.log('INTERCEPT');
  const idToken = localStorage.getItem('jwt');
  if (idToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    return next(req);
  } else {
    return next(req);
  }
};
