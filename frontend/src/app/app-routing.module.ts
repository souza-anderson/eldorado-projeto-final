import { ViewMovieComponent } from './components/pages/movie/view-movie/view-movie.component';
import { CreateMovieComponent } from './components/pages/movie/create-movie/create-movie.component';

import { IndexMovieComponent } from './components/pages/movie/index-movie/index-movie.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ContainerComponent } from './components/pages/container/container.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'movies',
    component: IndexMovieComponent
  },
  {
    path: 'movies/create',
    component: CreateMovieComponent
  },
  {
    path: 'movies/view/:id',
    component: ViewMovieComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
