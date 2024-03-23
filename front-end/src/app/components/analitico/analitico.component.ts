import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormatarMoedaBrl } from '../../services/formatar-moeda-brl.service';

@Component({
  selector: 'app-analitico',
  templateUrl: './analitico.component.html',
  styleUrls: ['./analitico.component.css']
})
export class AnaliticoComponent {
  displayedColumns: string[] = ['CONTRATO', 'NOME', 'VALOR', 'DATA_DO_CONTRATO'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    public FormatarMoedaBrl: FormatarMoedaBrl
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const apiUrl = 'http://localhost:8080/api/tabela.asp';
    this.http.get<any[]>(apiUrl).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
