import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState, AuthMethods, AuthProviders } from 'angularfire2'

@Injectable()

export class AuthService {

    authState: FirebaseAuthState

    constructor(private af: AngularFire, private router: Router) { }

    signIn(email: string, password: string, callback: any) {
        return this.af.auth.login({ email: email, password: password }).then(
            (success) => callback(),
            (error) => callback(error)
        )
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
        return firebase.auth().sendPasswordResetEmail(email).then(
            (success) => callback(),
            (error) => callback(error)
        )
    }

    /* TODO: améliorer la récupération de l'utilisateur courant*/
    currentUser(callback: any) {
        return this.af.auth.subscribe(authData => callback(authData))
    }

    setInfoMoviefromCurrentUser() {

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

}