import { MovieService } from './../../../../services/movie.service';
import { GenreService } from './../../../../services/genre.service';
import { Component, OnInit } from '@angular/core';
import Movie from 'src/app/models/movie/movie.model';
import Genre from 'src/app/models/genre.model';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {

  public movie: Movie = {
    status: '',
    data: {
      name: '',
      billing: null,
      created_at: null,
      genre: '',
      poster: '',
      release_year: null,
      synopsis: '',
      slug: '',
      poster_full_path: ''
    }
  };

  public file;
  teste
  public genres: any;
  public hasErrors;
  public errors = []
  public hasSuccess;
  public successMessage;

  constructor(
    private genreService: GenreService,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    return this.genreService.getAll().subscribe(genres => {
      this.genres = genres;
      console.log('gemres', this.genres.data.genres);
    })
  }

  addNew() {
    let formData: FormData = new FormData();
    formData.append('name', this.movie.data.name);
    formData.append('synopsis', this.movie.data.synopsis);
    formData.append('poster', this.movie.data.poster);
    formData.append('release_year', (new Date(this.movie.data.release_year).getFullYear() + 1).toString());
    formData.append('billing', this.movie.data.billing.toString());
    formData.append('genre[id]', this.movie.data.genre);

    if(this.file){
      formData.append("poster", this.file, this.file['name']);
    }
    
    this.movieService.create(formData).subscribe(movie => {
      this.hasSuccess = true;
      this.successMessage = movie.data.name
      this.movie = {
        status: "",
        data: {
          name: '',
          billing: null,
          created_at: null,
          genre: '',
          poster: '',
          release_year: null,
          synopsis: '',
          slug: '',
          poster_full_path: ''
        }
      };
    }, error => {
      console.log(error)
      this.hasErrors = true;

      console.log('error', error)
      if (error.status === 409) {
        this.errors.push(error.data.movie)
      }

      for(let err of error.error.message) {
        this.errors.push(err);
      }
    })
 
  }

  handleFile(arquivo) {
    this.file = arquivo[0] || null;
  }

}
