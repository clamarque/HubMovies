import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../shared/_services/index';

@Component({
    //moduleId: module.id.replace('/dist/', '/'),
    selector: 'reset-password-component',
    templateUrl: './app/reset-password/reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
    error: string;

    constructor(private router: Router, private authService: AuthService, private snackbar: MdSnackBar) { }

    onSubmit(formData) {
        if (formData.valid) {
            this.authService.resetPasswordEmail(formData.value.email, (error) => {
                if (error) {
                    this.error = error
                    this.snackbar.open(this.error, 'hide', { duration: 10000 })
                }
                else {
                    this.snackbar.open('Email sent', '', { duration: 5000 })
                    this.router.navigate(['/index'])
                }
            })
        }
    }

    ngOnInit() {

    }
}