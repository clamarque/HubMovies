import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFire } from 'angularfire2';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras,
    CanLoad, Route
} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private authService: AuthService, private router: Router, private af: AngularFire) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean | Observable<boolean> {
        let url = `/${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): Observable<boolean> {
        return this.af.auth.map((auth) => {
            if (auth === null) {
                // Store the attempted URL for redirecting
                this.authService.redirectUrl = url;
                // Create a dummy session id
                let sessionId = 123456789;

                // Set our navigation extras object
                // that contains our global query params and fragment
                let navigationExtras: NavigationExtras = {
                    queryParams: { 'session_id': sessionId },
                    fragment: 'anchor'
                };

                // Navigate to the login page with extras
                this.router.navigate(['/sign-in'], navigationExtras);
                return false;
            } else {
                return true
            }
        })
    }
}