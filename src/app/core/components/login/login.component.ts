
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthFirebaseService } from '../../../shared/services/auth/auth-firebase.service';


@Component({
  selector: 'login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor( private AuthService: AuthFirebaseService ) {  }

  login(){
    this.AuthService.login();
  }

}
