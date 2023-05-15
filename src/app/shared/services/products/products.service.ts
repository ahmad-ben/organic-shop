import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor( private aFireDateBase: AngularFireDatabase ) { }

  addProduct(productInfo: any){
    //=>Add A Obj For Specific New Item.
    return this.aFireDateBase.list('/products').push(productInfo);
  }

  getAllProducts(){

    //=>Get All Objs For All The Existing Item In Firebase.
    //: The First Obs For Get All The Keys For All The Products
    return this.aFireDateBase.list('/products')
      .snapshotChanges().pipe(
        switchMap((Response: SnapshotAction<unknown>[]) => {

          //:: Store The Keys In Array.
          let ProductKey!: string;
          let arrProductKey: string[] = [];
          Response.forEach((productInfo) => {
            ProductKey = productInfo.key as string;
            arrProductKey.push(ProductKey);
          })

          //: The Second Obs For Get All The Products
          return this.aFireDateBase.list(
            '/products',
            response => response.orderByChild('name')
          )
          .valueChanges().pipe(

            //:: map Operator To Add The Key Value.
            map(ArrayProjectsInfo =>{
              ArrayProjectsInfo.forEach( (projectInfo: any, i) => {
                projectInfo.key = arrProductKey[i];
              })

              return ArrayProjectsInfo

            })
          );
        })
      )

  }

  getProduct(productUID: string){
    //=> Get Specific Obj By His Id.
    return this.aFireDateBase.object(`/products/${productUID}`).valueChanges();
  }

  updateProduct(productUID: string, product: any){
    //=> Update Specific Obj.
    return this.aFireDateBase.object(`/products/${productUID}`).update(product);
  }

  deleteProduct(productUID: string){
    //=> Delete Specific Obj.
    return this.aFireDateBase.object(`/products/${productUID}`).remove();
  }

}
