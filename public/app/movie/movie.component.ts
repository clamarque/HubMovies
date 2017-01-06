import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { AuthService, DataService } from '../shared/_services/index';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
    //moduleId: module.id.replace('/dist/', '/'),
    selector: 'movie-component',
    templateUrl: './app/movie/movie.component.html'
})
export class MovieComponent implements OnInit {
    movieDetails: any[];
    movieVideo: any[];
    error: string;
    isConnected: boolean = false;

    baseUrl: string = 'https://www.youtube.com/embed/';
    url: any

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
                this.movieDetails = response
                console.log('movie', this.movieDetails)
            })

        this.route.params
            .switchMap((params: Params) => this.dataService.getVideoMovie(+params['id']))
            .subscribe(response => {
                this.movieVideo = response
                console.log('video', this.movieVideo)
            });

        return this.authService.isLoggedIn().subscribe(
            authStatus => {
                if (authStatus == true) return this.isConnected = true
                else return this.isConnected = false
            })
    }
}

