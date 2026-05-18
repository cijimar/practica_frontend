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

  // =========================
  // LOGIN (si tu backend lo usa aquí)
  // =========================
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
  createUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, user);
  }

  // =========================
  // ACTUALIZAR USUARIO
  // =========================
  updateUser(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.apiUrl}/${user.id}`,
      user
    );
  }

  // =========================
  // ELIMINAR USUARIO
  // =========================
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}