import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AppUser } from '../../../shared/models/app-user';
import { shoppingCart } from '../../../shared/models/shopping-cart';
import { AuthFirebaseService } from '../../../shared/services/auth/auth-firebase.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart/shopping-cart.service';


@Component({
  selector: 'bs-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
  ],
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  userInfo!: AppUser | null;
  cart$!: Observable<shoppingCart>;
  constructor (
    public authService: AuthFirebaseService,
    private shoppingCartSer: ShoppingCartService
  ){}

  async ngOnInit() {
    this.authService.appUser$.subscribe( userDBObj => this.userInfo = userDBObj );
    this.cart$ = await this.shoppingCartSer.getCart();
  }

  logOut(){
    this.authService.logOut();
  }

}
