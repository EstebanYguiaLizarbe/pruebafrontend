import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Departamento } from '../interfaces/departamento';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private endpoint: string = environment.apiUrl;
  private URL: string = this.endpoint + "departamento/";

  constructor(
    private http: HttpClient
  ) {


  }

  getList():Observable<Departamento[]>{
    return this.http.get<Departamento[]>(`${this.URL}lista`)
  }
}
