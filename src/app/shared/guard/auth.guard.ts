import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {catchError, switchMap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const url = state.url;

    return this.authService.isAuthenticated()
      .pipe(
        switchMap((isLogged: boolean) => {
          if (!isLogged && (url === '/sign-in' || url === '/sign-up')) {
            return of(true);
          }
          if (isLogged && (url === '/sign-in' || url === '/sign-up')) {
            this.router.navigate(['/home'])
            return of(false);
          }
          if (!isLogged) {
            this.router.navigate(['/'], {
              queryParams: {
                auth: false
              }
            })
          }
          return of(isLogged);
        }),
        catchError((err) => {
          console.log(err);
          if (url === '/sign-in' || url === '/sign-up') {
            return of(true);
          }
          this.router.navigate(['sign-in']);
          return of(true);
        })
      )
  }
}
