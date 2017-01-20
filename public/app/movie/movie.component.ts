import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService, DataService } from '../shared/_services/index';
import 'rxjs/add/operator/switchMap';

@Component({
    //moduleId: module.id.replace('/dist/', '/'),
    selector: 'movie-component',
    templateUrl: './app/movie/movie.component.html'
})
export class MovieComponent implements OnInit {
    movie: any[];
    movieVideo: any[];
    similarMovies: any[];
    error: string;
    isConnected: boolean = false;
    baseUrl: string = 'https://www.youtube.com/embed/';
    url: any;

    constructor(private sanitizer: DomSanitizer, private dataService: DataService, private route: ActivatedRoute, private location: Location, private authService: AuthService, private snackbar: MdSnackBar) { }

    saveMovie(movie: any, category: string) {
        this.authService.setMovies(movie, category, (error) => {
            if (error) {
                this.error = error
                this.snackbar.open(this.error, 'retry', { duration: 10000 })
            }
            else {
                this.snackbar.open('Your movie was been save', '', { duration: 5000 })
            }
        })
    }

    seeTrailer(id: string) {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
    }

    ngOnInit() {

        this.route.params
            .switchMap((params: Params) => this.dataService.getDetailsMovie(+params['id']))
            .subscribe(response => {
                this.movie = response
            })

        this.route.params
            .switchMap((params: Params) => this.dataService.getVideoMovie(+params['id']))
            .subscribe(response => {
                this.movieVideo = response
            });

        this.route.params
            .switchMap((params: Params) => this.dataService.getSimilarMovies(+params['id']))
            .subscribe(response => {
                this.similarMovies = response
            })

        return this.authService.isLoggedIn().subscribe(
            authStatus => {
                if (authStatus == true) return this.isConnected = true
                else return this.isConnected = false
            })
    }
}