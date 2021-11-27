import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment"
import { EMPTY, Observable } from 'rxjs';
import Movie from '../models/movie/movie.model';
import { map, catchError } from 'rxjs/operators'
import MovieList from '../models/movie/movie-list.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  // RxJS
  getAll(page?, per_page?): Observable<MovieList> {
    page = typeof page !== "undefined" ? page : 1;
    let url_page = `?page=${page}`;
    url_page += `&per_page=${per_page}`

    return this.http.get<MovieList>(`${environment.baseApiUrl}/movies${url_page}`)
              .pipe(
                map(obj => obj.data.movies),
                catchError(e => this.errorHandler(e))
              )
  }

  create(formData: FormData): Observable<Movie> {
    return this.http.post<Movie>(`${environment.baseApiUrl}/movies`, formData)
    // .pipe(
    //   map(obj => obj),
    //   catchError(e => this.errorHandler(e))
    // )
  }

  delete(id: number): Observable<void> {
    return this.http.delete(`${environment.baseApiUrl}/movies/${id}`)
      .pipe(
        map(obj => obj),
        catchError(e => this.errorHandler(e))
      );
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
