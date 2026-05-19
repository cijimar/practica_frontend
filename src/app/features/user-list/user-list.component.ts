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
  @Output() cerrarPopUpOk = new EventEmitter<void>();
  @Output() cerrarPopUpCancel = new EventEmitter<void>();

  modoPopup: String = 'CLOSED';

  constructor(private router: Router, private userService: UserService) {      
  }

  ngOnInit(): void {

    console.log("Cargando usuarios...");

  this.userService.getAllUsers().subscribe({
    next: (data) => {
      console.log("DATA BACKEND:", data);
      this.usuarios = data;
    },
    error: (error) => {
      console.error("ERROR BACKEND:", error);
    }
  });

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

 

}
