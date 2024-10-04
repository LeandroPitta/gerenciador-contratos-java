import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Contrato } from '../models/contrato';
import { ContratoUpdateRequest } from '../models/contrato-update-request';
import { Estatisticas } from '../models/estatisticas';

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

  updateContrato(numeroContrato: string, body: ContratoUpdateRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${numeroContrato}`, body);
  }

  gerarNumeroContrato(): Observable<{ numeroContrato: string }> {
    return this.http.get<{ numeroContrato: string }>(`${this.apiUrl}/gerarNumeroContrato`);
  }

  cadastrarContrato(body: ContratoUpdateRequest): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

  getEstatisticas(): Observable<Estatisticas> {
    return this.http.get<Estatisticas>(`${this.apiUrl}/estatisticas`);
  }
}
