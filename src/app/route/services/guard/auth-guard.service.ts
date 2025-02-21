
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthFirebaseService } from '../../../shared/services/auth/auth-firebase.service';
import { UserService } from '../../../shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthFirebaseService,
    private router: Router,
    private userService: UserService,
  ) { }

  canActivateAuth(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ) : Observable<boolean>{
    //=>Create An Observable That Return Boolean Value From The Origin Obs.
    const userLogged$: Observable<boolean> = this.authService.useInfoFromFB$.pipe(
      map<firebase.default.User | null, boolean>(user => {
        if (user) return true;
        else{
          this.router.navigate(['/login'], { queryParams:{wantedUrl: state.url} }); 
          return false;       
        }
      })
      )
    return userLogged$;
  }

  canActivateAdmin() : Observable<boolean>{
    return this.authService.appUser$.pipe(
      //?Change The Output Of The Obs.
      map(userDataObj => {return (userDataObj?.isAdmin) ? userDataObj.isAdmin : false} )
    )
  }
}
