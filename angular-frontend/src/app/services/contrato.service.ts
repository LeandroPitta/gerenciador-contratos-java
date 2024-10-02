import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Contrato {
  contrato: string;
  nome: string;
  valor: number;
  dataContrato: string;
}

interface ApiResponse {
  total: number;
  totalPages: number;
  page: number;
  size: number;
  content: Contrato[];
}

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
}
