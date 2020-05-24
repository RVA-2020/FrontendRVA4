import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Artikl } from '../models/artikl';

@Injectable({
  providedIn: 'root'
})
export class ArtiklService {

  private readonly API_URL = 'http://localhost:8083/artikl/';

  dataChange: BehaviorSubject<Artikl[]> = new BehaviorSubject<Artikl[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllArtikl(): Observable<Artikl[]> {
    this.httpClient.get<Artikl[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' --> ' + error.message);
    });

    return this.dataChange.asObservable();
  }

  public addArtikl(artikl: Artikl): void {
    artikl.id = 0;
    this.httpClient.post(this.API_URL, artikl).subscribe();
  }

  public updateArtikl(artikl: Artikl): void {
    this.httpClient.put(this.API_URL, artikl).subscribe();
  }

  public deleteArtikl(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
    console.log('Deleting Artikl with ID: ' + id);
  }

}
