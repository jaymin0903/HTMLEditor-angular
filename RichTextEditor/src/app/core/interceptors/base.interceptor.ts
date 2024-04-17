import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable } from 'rxjs';

export const API_URL = new InjectionToken<string>('API_URL');
@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(API_URL) private apiUrl?: string) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        headers: request.headers,
        url: this.prependBaseUrl(request.url),
      })
    );
  }

  private prependBaseUrl(url: string) {
    return [this.apiUrl?.replace(/\/$/g, ''), url.replace(/^\.?\//, '')]
      .filter((val) => val)
      .join('/');
  }
}
