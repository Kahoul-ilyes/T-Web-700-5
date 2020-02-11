import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import {UserService} from '../user/user.service';
import {empty} from 'rxjs';
import {getSortHeaderNotContainedWithinSortError} from '@angular/material/sort/typings/sort-errors';
import {CurrencyService} from '../crypto/shared/currency.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {

  currencyList = Array();
  passVerifDisabled = true;
  constructor(public auth: AuthService, public userService: UserService, public currencyService: CurrencyService, private fb: FormBuilder, private snackBar: MatSnackBar) {
  }
  currentUser = null;
  // options: FormGroup;
  profileForm = this.fb.group({
    username: [null, Validators.required],
    email: [null, Validators.required],
    currency: [null, Validators.required],
    password: [null, Validators.required],
    passwordverif: [null, Validators.required]
  });

  ngOnInit() {
    this.auth.userProfile$.subscribe(userAuthO => {
      if (userAuthO) {
        this.userService.getUser(userAuthO.sub).subscribe(res => {
          // @ts-ignore
          this.currentUser = res.user;
          this.profileForm = this.fb.group({
            username: [this.currentUser.username, Validators.required],
            email: [this.currentUser.email, Validators.required],
            currency: [this.currentUser.user_metadata.currency, Validators.required],
            password: [null, Validators.required],
            passwordverif: [null, Validators.required]
          });
          // console.log(res)
          console.log(this.objectUser());
        });
      }
    });

    this.currencyService.getCurrencies().subscribe(res => {
      // @ts-ignore
      // tslint:disable-next-line:forin
      for (const data in res.currencies) {
        this.currencyList.push(data);
      }
    });
  }
  objectUser() {
    return this.profileForm.getRawValue();
  }
  submitUpdate() {
    this.userService.updateUser(this.userService.currentUser.id, this.profileForm.getRawValue());
  }

  save() {
    // call address service method
    const data = this.profileForm.value;

    console.log('data', data);
    // @ts-ignore
    if (data.username !== null) {
      // @ts-ignore
      this.userService.updateUser(this.userService.currentUser.id, {username: data.username}).subscribe(res => {
        console.log('resultat update username', res);
      } );
    }
    if (data.currency !== null) {
      // @ts-ignore
      this.userService.updateUser(this.userService.currentUser.id, {currency: data.currency}).subscribe(resu => {
        console.log('resultat update currency', resu);
      } );
    }
    if (data.password !== null && data.passwordverif !== null && data.passwordverif === data.password && this.isPasswordStrong(data.password)) {
      this.userService.updateUser(this.userService.currentUser.id, {password: data.password}).subscribe(resu => {
        console.log('resultat update password', resu);
      });
    } else if (data.password === null) {
      // rien, ca signifie qu'il n'y a pas eu de tentative d'edit
    } else if (data.passwordverif === null) {
      this.snackBar.open('please enter password and validation');
    } else if (data.passwordverif !== data.password) {
      this.snackBar.open('password didnt match confirmation');
    } else if (!this.isPasswordStrong(data.password)) {
      this.snackBar.open('Password should contain 8+ characters,at least one uppercase and one lowercase letter, and a digit ');
    }

  }
  isPasswordStrong(password: string ): boolean {
    return password.length >= 8 && password.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)') !== null;

  }

  isPasswordEntered(): void {
    this.passVerifDisabled =  !(this.profileForm.getRawValue().password === null || this.profileForm.getRawValue().password.trim() !== '');
  }
}
