import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ContratoService } from '../../services/contrato.service';
import { FormatarMoedaBrl } from '../../utils/formatar-moeda-brl.service';

@Component({
  selector: 'app-analitico',
  templateUrl: './analitico.component.html',
  styleUrls: ['./analitico.component.css']
})
export class AnaliticoComponent implements OnInit {
  displayedColumns: string[] = ['contrato', 'nome', 'valor', 'dataContrato'];
  dataSource!: MatTableDataSource<any>;
  totalItems = 0;
  pageSize = 5;
  currentPage = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private contratoService: ContratoService,
    public FormatarMoedaBrl: FormatarMoedaBrl
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.contratoService.getContratos(this.currentPage, this.pageSize).subscribe(response => {
      this.dataSource = new MatTableDataSource(response.content);
      this.dataSource.sort = this.sort;
      this.totalItems = response.total;
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
