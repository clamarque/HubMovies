import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../shared/_services/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
    //moduleId: module.id.replace('/dist/', '/'),
    selector: 'favorite-component',
    templateUrl: './app/favorite/favorite.component.html'
})
export class FavoriteComponent implements OnInit {
    error: string;
    isConnected: boolean = false;
    movies = [];
    baseUrl: string = 'https://www.youtube.com/embed/';
    url: any;
    sub: Subscription;

    constructor(private sanitizer: DomSanitizer, private authService: AuthService, private snackbar: MdSnackBar) { }

    seeTrailer(id: string) {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
    }
    deleteMovie(key: any) {
        this.authService.deleteMovies('FavoriteMovie', key);
    }
    ngOnInit() {
        this.sub = this.authService.getMovies('FavoriteMovie').subscribe(data => {
            this.movies = data
        })

        return this.authService.isLoggedIn().subscribe(
            authStatus => {
                if (authStatus == true) return this.isConnected = true
                else return this.isConnected = false
            })
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}