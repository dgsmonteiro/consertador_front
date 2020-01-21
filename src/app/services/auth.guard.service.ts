import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { UserComponent} from '../components/user/user.component';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user: UserComponent = new UserComponent();

    if (user.accountType === next.data.accountType) {
      return true;
    }

    // navigate to not found page
    this._router.navigate(['/404']);
    return false;
  }

}
