
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from '../../interfaces/empleado';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrl: './dialogo-delete.component.css'
})
export class DialogoDeleteComponent {
  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
    @Inject (MAT_DIALOG_DATA) public dataEmpleado: Empleado 
  ){

  }

  confirmarEliminar(){
    if(this.dataEmpleado){
      this.dialogoReferencia.close("eliminar");
    }
  }
}
