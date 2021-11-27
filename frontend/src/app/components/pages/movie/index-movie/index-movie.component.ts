import { MovieService } from './../../../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import Movie from '../../../../models/movie/movie.model';
import MovieList from 'src/app/models/movie/movie-list.model';

@Component({
  selector: 'app-index-movie',
  templateUrl: './index-movie.component.html',
  styleUrls: ['./index-movie.component.scss']
})
export class IndexMovieComponent implements OnInit {

  movies: any;
  public per_page = 5;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.index();
  }

  index(page?) {
    this.movieService.getAll(page, this.per_page).subscribe(movies => {
      console.log('movies', movies.data);
      this.movies = movies;
    });
  }

  delete(id: number) {
    this.movieService.delete(id).subscribe(data => {
      alert('User deleted');
      this.index();
    }, error => {
      alert(error.message);
    });
  }

  paginate(page) {
    this.index(page);
  }

  setPerPage(per_page) {
    this.per_page = per_page
    this.index();
  }
}
