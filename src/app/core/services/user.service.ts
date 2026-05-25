import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import ConstUrls from '../../shared/constants/const-urls';

import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = ConstUrls.API_URL + '/api/v1/usuarios';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {

    const body = {
      [ConstUrls.NICK_USUARIO_PARAM]: username,
      [ConstUrls.PASS_USUARIO_PARAM]: password
    };

    return this.http.post(
      ConstUrls.API_URL + '/api/v1/login',
      body
    );
  }

  // =========================
  // OBTENER TODOS LOS USUARIOS
  // =========================
  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // =========================
  // OBTENER USUARIO POR ID
  // =========================
  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // =========================
  // CREAR USUARIO
  // =========================
  createUser(usuario: Usuario): Observable<Usuario> {
    const body = {
      esAdmin: usuario.esAdmin,
      nickUsuario: usuario.nickUsuario,
      contrasena: usuario.contrasena,
      nombre: usuario.nombre,
      primerApellido: usuario.primerApellido,
      segundoApellido: usuario.segundoApellido,
      fechaNacimiento: usuario.fechaNacimiento,
      horaDesayuno: usuario.horaDesayuno,
      generoId: Number(usuario.genero.id),
      puestoDeTrabajoId: usuario.puestoTrabajo?.id ? Number(usuario.puestoTrabajo.id) : null
    };
    return this.http.post<Usuario>(this.apiUrl, body);
  }

  // =========================
  // ACTUALIZAR USUARIO
  // =========================
  updateUser(usuario: Usuario): Observable<Usuario> {
    const body = {
      esAdmin: usuario.esAdmin,
      nickUsuario: usuario.nickUsuario,
      contrasena: (usuario as any).contrasena ?? '',
      nombre: usuario.nombre,
      primerApellido: usuario.primerApellido,
      segundoApellido: usuario.segundoApellido,
      fechaNacimiento: usuario.fechaNacimiento,
      horaDesayuno: usuario.horaDesayuno,
      generoId: (usuario as any).generoId ?? usuario.genero?.id,
      puestoDeTrabajoId: (usuario as any).puestoDeTrabajoId ?? usuario.puestoTrabajo?.id
    };
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, body);
  }

  // =========================
  // ELIMINAR USUARIO
  // =========================
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // =========================
  // OBTENER TODAS LAS DIRECCIONES 
  // =========================
  getAllDirecciones(): Observable<any[]> {
    return this.http.get<any[]>(ConstUrls.API_URL + '/api/v1/direcciones');
  }

}