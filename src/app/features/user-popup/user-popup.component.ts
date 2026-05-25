import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Usuario } from "src/app/core/models/user.model";

@Component({
    selector: 'app-user-popup',
    templateUrl: './user-popup.component.html',
    styleUrls: ['./user-popup.component.css'],
    standalone: true,
    imports: [ CommonModule, FormsModule ]
})

export class UserPopupComponent {

    @Input() modo: 'CREATE' | 'EDIT' = 'CREATE';
    @Input() usuario: Usuario | null = null;

    @Output() cerrarPopUpOk = new EventEmitter<Usuario>();
    @Output() cerrarPopUpCancel = new EventEmitter<void>();

    usuarioForm: Usuario = this.initUsuario();

    ngOnChanges(): void {
        if (this.modo === 'EDIT' && this.usuario) {
            this.usuarioForm = {
                ...this.usuario,
                genero: this.usuario.genero ?? { id: (this.usuario as any).generoId, nombre: '' },
                puestoTrabajo: this.usuario.puestoTrabajo ?? { id: (this.usuario as any).puestoDeTrabajoId, nombre: '' }
            };
        } else {
            this.usuarioForm = this.initUsuario();
        }
    }

    initUsuario(): Usuario {
    return {
        id: 0,
        esAdmin: false,
        nickUsuario: '',
        nombre: '',
        contrasena: '',
        fechaHoraCreacion: new Date(),

        genero: {
        id: 1,
        nombre: ''
        },

        primerApellido: '',
        segundoApellido: '',
        fechaNacimiento: null,
        horaDesayuno: '',

        puestoTrabajo: {
        id: 1,
        nombre: ''
        },

        direcciones: []
    };
    }

    onSave() {
        this.cerrarPopUpOk.emit(this.usuarioForm);
    }

    onCancel() {
        this.cerrarPopUpCancel.emit();
    }
}
