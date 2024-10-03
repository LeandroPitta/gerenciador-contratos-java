import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Contrato } from '../models/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private apiUrl = 'http://127.0.0.1:8080/gerenciador-contratos-java-0.0.1-SNAPSHOT/contratos';

  constructor(private http: HttpClient) {}

  getContratos(page: number, size: number): Observable<ApiResponse> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }

  getContratoById(id: number): Observable<Contrato> {
    return this.http.get<Contrato>(`${this.apiUrl}/${id}`);
  }
}
