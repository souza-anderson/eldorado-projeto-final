import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Genre from '../models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Genre> {
    return this.http.get<Genre>(`${environment.baseApiUrl}/genres`)
   
  }

  errorHandler(e: any): Observable<any> {
    let errors = [];
    for(let er of e.error.message) {
      errors.push(er)
    }
    let str_errors = JSON.stringify(errors);
    throw new Error(str_errors)
    return EMPTY;
  }
}
