import { ViewMovieComponent } from './components/pages/movie/view-movie/view-movie.component';
import { IndexMovieComponent } from './components/pages/movie/index-movie/index-movie.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/pages/container/container.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { MenuComponent } from './components/templates/menu/menu.component';
import { CreateMovieComponent } from './components/pages/movie/create-movie/create-movie.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    CreateMovieComponent,
    IndexMovieComponent,
    ViewMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
