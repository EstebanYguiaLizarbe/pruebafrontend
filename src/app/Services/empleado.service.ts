import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private endpoint: string = environment.apiUrl;
  private URL: string = this.endpoint + "empleado/";

  constructor(
    private http: HttpClient
  ) {


  }

  getList():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.URL}lista`)
  }

  add(modelo: Empleado):Observable<Empleado>{
    return this.http.post<Empleado>(`${this.URL}guardar`, modelo);
  }

  update(id:number, modelo: Empleado):Observable<Empleado>{
    return this.http.put<Empleado>(`${this.URL}actualizar/${id}`, modelo);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.URL}eliminar/${id}`);
  }
}
