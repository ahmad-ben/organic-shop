import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import 'firebase/auth';
import * as firebase from 'firebase/compat/app';
import { Observable, of, switchMap } from 'rxjs';
import { AppUser } from '../../models/app-user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
    //=>Observable That Represent The Return Of The Firebase Auth Observable.
    useInfoFromFB$!: Observable<firebase.default.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: Router,
    private ActiveRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    //=>Link It With The Observable of authentication state.
    this.useInfoFromFB$ = afAuth.authState;
  }

  login(){
    //=>Determine The URL To Redirect The User To The Page That He Asked Without Permission Or To The Main Page.
    let futureUrl = this.ActiveRoute.snapshot.queryParamMap.get('wantedUrl') || '/';

    //=>initializes a new instance of the GoogleAuthProvider class.
    const provider = new firebase.default.auth.GoogleAuthProvider();

    //=>sign in to Firebase Authentication using a popup window.
    this.afAuth.signInWithPopup(provider).then(
      (successResponse) => {
        //=>If The Login Process Success We Will Redirect The User.
        this.userService.saveUserInfo(successResponse.user as firebase.default.User);
        this.route.navigateByUrl(futureUrl);
      }
    );
  }

  logOut(){
    //=>LogOut Method.
    return this.afAuth.signOut().then(
      (successLogout) => this.route.navigateByUrl('')
    )
  }

  get appUser$() : Observable<AppUser | null>{
    return this.useInfoFromFB$.pipe(
      //=>Switch The Obs And Forget The First One.
      //=>Change The Object From The Firebase Object To Our Object.
      switchMap( (user: any) => {
        return (!user) ?  of(null) : this.userService.getUser(user?.uid as string)
      }),
    )
  }
}







