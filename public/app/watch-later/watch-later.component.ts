import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { AuthService, DataService } from '../shared/_services/index';

import { DomSanitizer } from '@angular/platform-browser';

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

    constructor(private sanitizer: DomSanitizer, private dataService: DataService, private route: ActivatedRoute, private location: Location, private authService: AuthService, private snackbar: MdSnackBar) { }

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

