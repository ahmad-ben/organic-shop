import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { AdminOrderInfoComponent } from '../../admin/components/admin-order-info/admin-order-info.component';
import { AdminOrdersComponent } from '../../admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from '../../admin/components/admin-products/admin-products.component';
import { ProductFromComponent } from '../../admin/components/product-from/product-from.component';
import { LoginComponent } from '../../core/components/login/login.component';
import { MyOrdersComponent } from '../../order/components/my-orders/my-orders.component';
import { OrderInfoComponent } from '../../order/components/order-info/order-info.component';
import { OrderSuccessComponent } from '../../order/components/order-success/order-success.component';
import { CheckOutComponent } from '../../shopping/components/check-out/check-out.component';
import { ProductsComponent } from '../../shopping/components/products/products.component';
import { ShoppingCartComponent } from '../../shopping/components/shopping-cart/shopping-cart.component';
import { AuthGuardService } from '../services/guard/auth-guard.service';


export const routes : Routes = [
  //=>Components/Pages For All The Users Even Anonymous Users.
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },

  //=>Components/Pages Specially For The Users Those Already Logged In.
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
        inject(AuthGuardService).canActivateAuth(route, state)
    ]
  },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
        inject(AuthGuardService).canActivateAuth(route, state)
    ]
  },
  {
    path: 'my/order/:index',
    component: OrderInfoComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
        inject(AuthGuardService).canActivateAuth(route, state)
    ]
  },
  {
    path: 'my/orders',
    component: MyOrdersComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
        inject(AuthGuardService).canActivateAuth(route, state)
    ]
  },

  //=>Components/Pages Specially For The Users Those Already Logged In And They Are Admins.
  {
    path: 'admin/products/new',
    component: ProductFromComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
        inject(AuthGuardService).canActivateAuth(route, state),
      () => inject(AuthGuardService).canActivateAdmin(),
    ]
  },
  {
    path: 'admin/products/:id',
    component: ProductFromComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
        inject(AuthGuardService).canActivateAuth(route, state),
      () => inject(AuthGuardService).canActivateAdmin(),
    ]
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
        inject(AuthGuardService).canActivateAuth(route, state),
      () => inject(AuthGuardService).canActivateAdmin(),
    ]
  },
  {
    path: 'admin/order/:index',
    component: AdminOrderInfoComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
        inject(AuthGuardService).canActivateAuth(route, state),
      () => inject(AuthGuardService).canActivateAdmin(),
    ]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
        inject(AuthGuardService).canActivateAuth(route, state),
      () => inject(AuthGuardService).canActivateAdmin(),
    ]
  },
]

