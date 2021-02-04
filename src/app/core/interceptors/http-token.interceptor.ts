import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            headers: req.headers.set('Content-Type', 'application/json')
                .set('X-TENANT-ID', 'mucompute')
                .set('X_ORGANIZATION_ID', 'mucompute')
                .set('X_GROUP_ID', 'mucompute')
        });
        return next.handle(modifiedReq);
    }
}