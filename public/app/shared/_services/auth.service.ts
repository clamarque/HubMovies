import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState, AuthMethods, AuthProviders } from 'angularfire2'
import { Observable } from 'rxjs/Observable';

@Injectable()

export class AuthService {

    authState: FirebaseAuthState
    redirectUrl: string;

    constructor(private af: AngularFire, private router: Router) { }

    signIn(email: string, password: string, callback: any) {
        return this.af.auth.login({ email: email, password: password })
            .then(success => callback())
            .catch(error => callback(error))
    }

    signOut() {
        this.af.auth.logout()
    }

    signUp(formData, callback: any): firebase.Promise<FirebaseAuthState> {
        return this.af.auth.createUser({
            email: formData.value.email, password: formData.value.password
        }).then(authState => {
            authState.auth.updateProfile({
                displayName: formData.value.username,
                photoURL: ''
            }), callback();
            return authState;
        }, (error) => callback(error));
    }

    resetPasswordEmail(email: string, callback: any) {
        return firebase.auth().sendPasswordResetEmail(email)
            .then(success => callback())
            .catch(error => callback(error))
    }

    getMovies(category: string) {
        let uid
        this.af.auth.subscribe(authData => {
            if (authData != null) uid = authData.uid
        })
        return this.af.database.list(category + '/' + uid)
    }

    setMovies(movie: any, category: string, callback: any) {
        return this.af.auth.subscribe(authData => {
            
            this.af.database.list(category + '/' + authData.uid).push({
                'id': movie.id,
                'original_title': movie.original_title,
                'overview': movie.overview,
                'popularity': movie.popularity,
                'release_date': movie.release_date,
                'poster_path': movie.poster_path
            })
                .then(success => callback())
                .catch(error => callback(error))
        })
    }

    deleteMovies(category: string, id: string) {
        let uid
        this.af.auth.subscribe(authData => {
            if (authData != null) uid = authData.uid
        })
        let item = this.af.database.list(category + '/' + uid)
        item.remove(id)
    }

    readUser() {
        return this.af.auth
    }

    updateUser(formData, callback: any) {
        return this.af.auth.subscribe(authState => {
            authState.auth.updateEmail(formData.value.email).then(success => {
                return authState.auth.updateProfile({
                    displayName: formData.value.displayName,
                    photoURL: ''
                })
            }, callback())
                .catch(error => callback(error))
        })
    }

    deleteUser(callback: any) {
        return this.af.auth.subscribe(authState => {
            authState.auth.delete()
                .then(success => callback())
                .catch(error => callback(error))
        })
    }

    isLoggedIn() {
        return this.af.auth.map((auth) => {
            if (auth === null) return false
            else return true
        });
    }

}