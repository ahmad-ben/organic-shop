import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AppUser } from '../../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( private aFireDateBase: AngularFireDatabase ) { }

  saveUserInfo(userInfo: firebase.default.User){
    this.aFireDateBase.object(`/users/${userInfo.uid}`).update({
      name: userInfo.displayName,
      email: userInfo.email,
    })
  }

  getUser(userUID: string) : Observable<AppUser>{
    //=>Search About The Object In Our Data Store By The ID.
    return this.aFireDateBase.object(`/users/${userUID}`)
      .valueChanges() as Observable<AppUser> ;
  }
}
