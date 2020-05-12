import { ArtiklService } from './../../services/artikl.service';
import { Artikl } from './../../models/artikl';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  dataSource: MatTableDataSource<Artikl>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private artiklService: ArtiklService) { }

  public loadData() {
    this.artiklService.getAllArtikl().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // otklanjanje razmaka
    filterValue = filterValue.toLocaleLowerCase(); // mala slova
    this.dataSource.filter = filterValue; //    MoJa   --> MoJa --> moja
  }

}
