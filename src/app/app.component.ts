import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Empleado } from './interfaces/empleado';
import { EmpleadoService } from './Services/empleado.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {

  constructor(
    private empleadoService: EmpleadoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){

  }

  ngOnInit(): void {
    this.mostrarEMpleados();
  }

  title = 'AngularNuevo';

  displayedColumns: string[] = ['NombreCompleto', 'Departamento', 'Sueldo', 'FechaContrato', 'Acciones'];
  dataSource = new MatTableDataSource<Empleado>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogoNuevoEmpleado() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      width: "350px"

    }).afterClosed().subscribe(resultado => {
      if(resultado === "creado"){
        this.mostrarEMpleados();
      }
    });
  }

  mostrarAlerta(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  dialogoEditarEmpleado(empleado: Empleado) {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      width: "350px",
      data: empleado
    }).afterClosed().subscribe(resultado => {
      if(resultado === "editado"){
        this.mostrarEMpleados();
      }
    });
  }

  dialogoEliminarEmpleado(empleado: Empleado){
    this.dialog.open(DialogoDeleteComponent, {
      disableClose: true,
      data: empleado
    }).afterClosed().subscribe(resultado => {
      if(resultado === "eliminar"){
        this.empleadoService.delete(empleado.idEmpleado).subscribe({
          next: () => {
            this.mostrarAlerta("Empleado fue eliminado", "Listo");
            this.mostrarEMpleados();
          }
        });
      }
    });
  }

  mostrarEMpleados(){
    this.empleadoService.getList().subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;

      }
    })
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}