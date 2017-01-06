import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/_services/index'
import { IndexComponent } from './index/index.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoriteMovieComponent } from './favoriteMovie/favoritemovie.component'
import { MovieComponent } from './movie/movie.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { SearchComponent } from './search/search.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { WatchLaterComponent } from './watch-later/watch-later.component';

const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'favorite-movie', component: FavoriteMovieComponent, canActivate: [AuthGuard] },
    { path: 'movie/:id', component: MovieComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'search/:term', component: SearchComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'upcoming', component: UpcomingComponent },
    { path: 'watch-later' , component: WatchLaterComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}