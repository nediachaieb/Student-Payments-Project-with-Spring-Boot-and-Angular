import {ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {Authentication} from '../services/authentication';

@Injectable()
export class AuthorizationGuard {

  constructor(private authService: Authentication, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated) {
      let requiredRoles = route.data['roles'];
      let userRoles = this.authService.roles;
      for (let role of userRoles) {
        if (requiredRoles.includes(role)) {
          return true;
        }
      }
      return false;
    } else {
      this.router.navigateByUrl("/login")
      return false;
    }
  }
}
