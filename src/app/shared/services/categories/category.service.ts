import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor( private aFireDateBase: AngularFireDatabase ) { }

  getAllCategories() {
    return this.aFireDateBase.list(
      '/categories',
    )
    //=>The snapshotChanges Will Give Me The UID Of Each Obj.
    .snapshotChanges().pipe(
      //=>The switchMap For Change The Obs From snapshotChanges To valueChanges.
      switchMap((Response: SnapshotAction<unknown>[]) => {
        let ProductKey!: string;
        let arrProductKey: string[] = [];
        Response.forEach((productInfo) => {
          ProductKey = productInfo.key as string;
          arrProductKey.push(ProductKey);
        })

        return this.aFireDateBase.list(
          '/categories',
          response => response.orderByChild('name')
        )
        //=>The valueChanges Will Give Me The Other Properties Those I Put In Each Obj.
        .valueChanges().pipe(
          //=>Merge The Two Outputs Of The Two Observables.
          map(ArrayProjectsInfo =>{
            ArrayProjectsInfo.forEach( (projectInfo: any, i) => {
              projectInfo.key = arrProductKey[i];
            })

            return ArrayProjectsInfo

          })
        );
      })
    );
  }

}
