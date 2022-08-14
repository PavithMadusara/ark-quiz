/**
 * @author Pavith Madusara
 *
 * Created at 20-Jan-2021
 * Wednesday at 2:45 PM
 */
import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {AuthState} from './auth.state';
import {concatMap, take} from 'rxjs/operators';
import {TokenRefresh} from './auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  @Select(AuthState.accessToken)
  accessToken$!: Observable<string>;

  @Select(AuthState.refreshToken)
  refreshToken$!: Observable<string>;

  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.accessToken$.pipe(
      take(1),
      // if access token available
      concatMap(accessToken => {
        if (accessToken) {
          return next.handle(req.clone({
            setHeaders: {Authorization: `Bearer ${accessToken}`},
          }));
        }
        return next.handle(req);
      }),
      // login with refresh token on Authentication Error
      concatMap(event => {
        let isTokenExpired = false;
        if (
          event.type === HttpEventType.Response &&
          event.status === 200 &&
          event.body &&
          Array.isArray(event.body.errors)
        ) {
          const errors = event.body.errors as any [];
          isTokenExpired = !!errors.find(e => e.message && e.message === 'Unauthorized');
        }

        if (isTokenExpired) {
          return this.refreshToken$.pipe(
            take(1),
            concatMap(refreshToken => this.store.dispatch(new TokenRefresh(refreshToken))),
            concatMap(accessToken => {
              if (accessToken) {
                return next.handle(req.clone({
                  setHeaders: {Authorization: `Bearer ${accessToken}`},
                }));
              } else {
                throw new Error('Error getting access token after Refresh');
              }
            }),
          );
        }
        return of(event);
      }),
    )
      ;
  }

}
