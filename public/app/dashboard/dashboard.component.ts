import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../shared/_services/index';
import { MdDialog, MdDialogRef } from '@angular/material'

@Component({
  //moduleId: module.id.replace('/dist/', '/'),
  selector: 'dashboard-component',
  templateUrl: './app/dashboard/dashboard.component.html',
  providers: [MdDialog]
})
export class DashboardComponent implements OnInit {

  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: any;
  selectedOption: string;

  dialogRef: MdDialogRef<DialogDeleteUser>;

  constructor(private authService: AuthService, private snackbar: MdSnackBar, private router: Router, private dialog: MdDialog) { }
  error: string;

  confirmDialog() {
    this.dialogRef = this.dialog.open(DialogDeleteUser, {
      disableClose: true
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
      if (result === 'yes') this.deleteAccount()
      else console.log('cancel')
    });
  }
  deleteAccount() {
    this.authService.deleteUser((error) => {
      if (error) {
        this.error = error
        this.snackbar.open(this.error, 'retry', { duration: 10000 })
      }
      else {
        this.snackbar.open('Good bye ! We hope that our site has pleased you.', '', { duration: 5000 })
        this.router.navigate(['/index'])
      }
    })
  }
  onSubmit(formData) {
    if (formData.valid) {
      this.authService.updateUser(formData, (error) => {
        if (error) {
          this.error = error
          this.snackbar.open(this.error, 'retry', { duration: 10000 })
        }
        else {
          this.snackbar.open('Success ! Your modifications was been applicated', '', { duration: 5000 })
          this.router.navigate(['/dashboard'])
        }
      })
    }
  }

  ngOnInit() {
    this.authService.readUser().subscribe(authData => {
      if (authData) {
        this.displayName = authData.auth.displayName
        this.email = authData.auth.email;
        this.emailVerified = authData.auth.emailVerified
        this.photoURL = authData.auth.photoURL;
      }
    }) 
  }
}

@Component({
  selector: 'dialog-delete-user',
  template: ` 
  <h1 md-dialog-title>Are you sure ?</h1>
    <button md-raised-button color="primary" (click)="dialogRef.close('yes')">Yes</button>
    <button md-raised-button color="primary" md-dialog-close (click)="dialogRef.close('no')">No</button>
 `
})

export class DialogDeleteUser {
  constructor(private dialogRef: MdDialogRef<DialogDeleteUser>) { }

}