import { HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

// http-interceptor.service.ts

import { Injectable } from '@angular/core';

@Injectable()
export class httpOnlyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    // Cloner la requête 
    const clonedRequest = req.clone({
      withCredentials: true 
    });

    // Ajouter l'en-tête httpOnly
    clonedRequest.headers.append('Set-Cookie', 'sessionId=12345; HttpOnly');

    // Passer à la requête suivante
    return next.handle(clonedRequest);
  }

}
