import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AngularFireModule, FIREBASE_PROVIDERS, AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

import { KeysPipe, ObjectToArrayPipe } from './shared/_pipes/index';
import { AuthGuard, AuthService } from './shared/_services/index'

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogDeleteUser } from './dashboard/dashboard.component';
import { FavoriteMovieComponent } from './favoriteMovie/favoritemovie.component';
import { MovieComponent } from './movie/movie.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { SearchComponent } from './search/search.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { WatchLaterComponent } from './watch-later/watch-later.component';
import { AppRoutingModule } from './app-routing.module';


export const firebaseConfig = {
    apiKey: "AIzaSyAV6yhUmJWeYYgJIH2_Op8VgTMa1JX9mI4",
    authDomain: "hubmovies-a26fc.firebaseapp.com",
    databaseURL: "https://hubmovies-a26fc.firebaseio.com",
    storageBucket: "hubmovies-a26fc.appspot.com",
    messagingSenderId: "559417527686"
};

export const firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    ],
    declarations: [
        AppComponent,
        IndexComponent,
        DashboardComponent,
        DialogDeleteUser,
        FavoriteMovieComponent,
        MovieComponent,
        ResetPasswordComponent,
        SearchComponent,
        SignInComponent,
        SignUpComponent,
        UpcomingComponent,
        WatchLaterComponent,
        ObjectToArrayPipe,
        KeysPipe
    ],
    providers: [AuthGuard, AuthService],
    bootstrap: [AppComponent],
    exports: [ObjectToArrayPipe, KeysPipe],
    entryComponents: [
        DialogDeleteUser
    ]
})
export class AppModule {

}