import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/user.service';

import { FormsModule } from '@angular/forms';

import ConstRoutes from '../../shared/constants/const-routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {

  username = '';
  password = '';

  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';

    this.userService.login(
      this.username,
      this.password
    ).subscribe({

      next: (response) => {

        localStorage.setItem(
          'loggedUser',
          JSON.stringify(response)
        );

        this.router.navigate([
          ConstRoutes.PATH_USUARIOS
        ]);
      },

      error: (error) => {

        this.errorMessage =
          'Usuario o contraseña incorrectos';
      }
    });
  }
}