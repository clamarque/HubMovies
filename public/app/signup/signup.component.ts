import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/_services/index';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
    //moduleId: module.id.replace('/dist/', '/'),
    selector: 'signup-component',
    templateUrl: './app/signup/signup.component.html'
})
export class SignUpComponent implements OnInit {
    error: string;
    constructor(private authService: AuthService, private router: Router, private snackbar: MdSnackBar) { }

    onSubmit(formData) {
        if (formData.valid) {
            this.authService.signUp(formData, (error) => {
                if (error) {
                    this.error = error
                    this.snackbar.open(this.error, 'retry', { duration: 10000 })
                }
                else {
                    this.authService.readUser().subscribe(authData => {
                        if (authData) {
                            this.snackbar.open('✓ Welcome ' + authData.auth.displayName, 'Your account was been created', { duration: 5000 })
                            this.router.navigate(['/index'])
                        }
                    })
                }
            })
        }
    }
    ngOnInit() {

    }
}