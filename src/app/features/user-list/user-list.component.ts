import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { Usuario } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';

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
  usuarioSeleccionado?: Usuario;
  
  @Output() cerrarPopUpOk = new EventEmitter<void>();
  @Output() cerrarPopUpCancel = new EventEmitter<void>();

  modoPopup: string = 'CLOSED';

  constructor(private router: Router, private userService: UserService) {      
  }

  ngOnInit(): void {

    console.log("Cargando usuarios...");

    // Cargamos los usuarios
    this.userService.getAllUsers().subscribe({
      next: (usuarios) => {
        console.log("DATA BACKEND:", usuarios);
        this.usuarios = usuarios;
      },
      error: (error) => {
        console.error("ERROR BACKEND:", error);
      }
    });

    //Cargamos las direcciones
    this.userService.getAllDirecciones().subscribe({
      next: (data) => {
        console.log("DATA BACKEND DIRECCIONES:", data);
        this.direcciones = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  
  }

  // Metodo para obtener la dirección principal de un usuario
  getDireccionPrincipal(usuario: any): string {
    const dir = this.direcciones.find(
      d => d.usuarioId === usuario.id && d.direccionPrincipal
    );
    return dir ? `${dir.nombreCalle} ${dir.numeroCalle}` : '-';     
  }

  //Metodo contador direcciones
  getNumDirecciones(usuario: any): number {
    return this.direcciones.filter(d => d.usuarioId === usuario.id).length;
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

  // Metodo seleccionar usuario
  seleccionarUsuario(usuario: Usuario): void {
    console.log('Seleccionado:', usuario);
    this.usuarioSeleccionado = usuario;
  }

  //Metodo eliminar usuario seleccionado
  eliminarUsuarioSeleccionado(): void {
    if (!this.usuarioSeleccionado) {
      alert('Selecciona un usuario');
      return;
    }

    this.userService
      .deleteUser(this.usuarioSeleccionado.id!)
      .subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(
            u => u.id !== this.usuarioSeleccionado?.id
          );
          this.usuarioSeleccionado = undefined;
          console.log('Usuario eliminado');
        },

        error: (error) => {
          console.error(error);
        }
      });
  }


}
