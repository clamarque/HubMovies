import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService, DataService } from './shared/_services/index';

@Component({
    //moduleId: module.id.replace('/dist/', '/'),
    selector: 'app-component',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
    providers: [DataService, AuthService, MdSnackBar]
})
export class AppComponent implements OnInit {
    movieSearching: any[];
    isConnected: boolean = false;

    constructor(private dataService: DataService, private router: Router, private af: AngularFire, private authService: AuthService, private snackbar: MdSnackBar) { }

    searchMovie(term: string) {
        console.log('term:', term)
        if (term === '') {
            this.router.navigate(['/index']);
        }
        else {
            this.router.navigate(['/search', term]);
        }
    }

    onSignOut() {
        this.authService.signOut();
        this.snackbar.open('Already Gone ? We Hope to see you again soon', '', { duration: 5000 })
        this.router.navigate(['/index'])
    }

    ngOnInit() {
        return this.authService.isLoggedIn().subscribe(
            authStatus => {
                console.log('connected:', authStatus)
                if (authStatus == true) return this.isConnected = true
                else return this.isConnected = false
            })
    }

}