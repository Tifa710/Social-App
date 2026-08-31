import { HttpInterceptorFn } from '@angular/common/http';

export const myHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const Token = localStorage.getItem('socialToken');
  if (Token) {
    const myReq = req.clone({
      setHeaders: {
        AUTHORIZATION: `Bearer ${Token}`,
      },
    });
    return next(myReq);
  } else return next(req);
};
