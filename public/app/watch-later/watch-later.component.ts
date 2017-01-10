import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../shared/_services/index';

@Component({
    //moduleId: module.id.replace('/dist/', '/'),
    selector: 'watch-later-component',
    templateUrl: './app/watch-later/watch-later.component.html'
})
export class WatchLaterComponent implements OnInit {
    error: string;
    isConnected: boolean = false;
    movies = [];
    baseUrl: string = 'https://www.youtube.com/embed/';
    url: any

    constructor(private sanitizer: DomSanitizer, private authService: AuthService, private snackbar: MdSnackBar) { }

    seeTrailer(id: string) {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
    }

    deleteMovie(key: any) {
        this.authService.deleteMovies('MovieLater' , key);
    }

    ngOnInit() {
        this.authService.getMovies('MovieLater').subscribe(data => {
            this.movies = data
        })

        return this.authService.isLoggedIn().subscribe(
            authStatus => {
                if (authStatus == true) return this.isConnected = true
                else return this.isConnected = false
            })
    }
}