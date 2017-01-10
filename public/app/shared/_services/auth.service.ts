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
    signInAccount(name: string, callback: any) {
        return this.af.auth.login({
            provider: this.getProvider(name),
            method: AuthMethods.Popup,
        })
            .then(success => callback())
            .catch(error => callback(error))
    }

    getProvider(name: string) {
        switch (name) {
            case 'google': return AuthProviders.Google;
            case 'facebook': return AuthProviders.Facebook;
            case 'twitter': return AuthProviders.Twitter;
        }
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
    setMovie(movie: any, category: string, callback: any) {
        let uid
        this.af.auth.subscribe(authData => {
            if (authData != null) uid = authData.uid
        })
        const list = this.af.database.list(category + '/' + uid)
        list.subscribe(data => {
            console.log(data)
            for (let index = 0; index < 1; index++) {
                for (let entry in data) {
                    console.log('data:', data[entry].id)
                    if (data[entry].id == movie.id) {
                        console.log('movie in db')
                    } else {
                        console.log('movie not in db')
                        this.af.database.list(category + '/' + uid).push({
                            'id': movie.id,
                            'original_title': movie.original_title,
                            'overview': movie.overview,
                            'popularity': movie.popularity,
                            'release_date': movie.release_date,
                            'poster_path': movie.poster_path
                        })
                        index = 1
                    }
                }
            }
        })

    }

    setMovies(movie: any, category: string, callback: any) {
        return this.af.auth.subscribe(authData => {
            if (authData) {
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
            }
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

    deleteDatafromUser() {
        let uid
        this.af.auth.subscribe(authData => {
            if (authData != null) uid = authData.uid
        })
        let item = this.af.database.list('MovieLater/' + uid)
        item.remove()
        let item1 = this.af.database.list('FavoriteMovie/' + uid)
        item1.remove()
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