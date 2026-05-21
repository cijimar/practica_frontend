import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { Usuario } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  providers: [UserService],
  imports: [ CommonModule, UserPopupComponent ]
})

export class UserListComponent implements OnInit {

  usuarios: Usuario [] = [];
  direcciones: any [] = [];

  @Output() cerrarPopUpOk = new EventEmitter<void>();
  @Output() cerrarPopUpCancel = new EventEmitter<void>();

  modoPopup: String = 'CLOSED';

  constructor(private router: Router, private userService: UserService) {      
  }

  ngOnInit(): void {

    console.log("Cargando usuarios...");

    // Cargamos los usuarios
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        console.log("DATA BACKEND:", data);
        this.usuarios = data;
      },
      error: (error) => {
        console.error("ERROR BACKEND:", error);
      }
    });

    //Cargamos las direcciones
    this.userService.getAllDirecciones?.().subscribe({
      next: (data) => {
        console.log("DATA BACKEND DIRECCIONES:", data);
        this.direcciones = data;
      },
      error: (error) => {
        console.error("ERROR BACKEND DIRECCIONES:", error);
      }
    });

  }

  // Metodo para obtener la dirección principal de un usuario
  getDireccionPrincipal(usuario: any): string {
    const direccionesUsuario = this.direcciones.filter(
      d => d.usuarioId === usuario.id
    );

    if (!direccionesUsuario || direccionesUsuario.length === 0) {
      return 'Sin dirección';
    }

    const principal = direccionesUsuario.find(
      d => d.direccionPrincipal === true
    );

    const dir = principal ?? direccionesUsuario[0];
    return `${dir.nombreCalle} ${dir.numeroCalle}`;
  }

  onCerrarPopUpOk() {
    this.modoPopup = 'CLOSED';
  }

  onCerrarPopUpCancel() {
    this.modoPopup = 'CLOSED';
  }
  
  launchPopup() {    
    this.modoPopup = 'LAUNCH';
  }

  // Metodo para obtener el numero de direcciones de un usuario
  getNumeroDirecciones(usuarioId: number): number {
    return this.direcciones.filter(
      d => d.usuarioId === usuarioId
    ).length;
  }
 

}
