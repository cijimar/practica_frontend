import {Genero} from "./genero.model";
import {PuestoDeTrabajo} from "./puestodetrabajo.model";
import {Direccion} from "./direccion.model";

export interface Usuario {
  id: number | null;
  esAdmin: boolean;
  nickUsuario: string;
  nombre: string | null;
  contrasena: string;
  fechaHoraCreacion: Date;
  genero: Genero;
  primerApellido: string | null;
  segundoApellido: string | null;
  fechaNacimiento: Date | null;
  horaDesayuno: string | null;
  puestoTrabajo: PuestoDeTrabajo;
  direcciones: Direccion[] | null;
}

export const usuarioInicial: Usuario = {
  id: null,
  esAdmin: false,
  nickUsuario: '',
  nombre: '',
  contrasena: '',
  fechaHoraCreacion: new Date(),
  genero: {
    id: 0,
    nombre: ''
  },
  primerApellido: '',
  segundoApellido: '',
  fechaNacimiento: new Date(),
  horaDesayuno: '',
  puestoTrabajo: {
    id: 0,
    nombre: ''
  },
  direcciones: []
};
