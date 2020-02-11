import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import {UserService} from "../user/user.service";
import {empty} from "rxjs";
import {getSortHeaderNotContainedWithinSortError} from "@angular/material/sort/typings/sort-errors";
import {CurrencyService} from "../crypto/shared/currency.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
  currentUser = null
  // options: FormGroup;
  profileForm = this.fb.group({
    username: [null, Validators.required],
    email: [null, Validators.required],
    currency: [null, Validators.required],
    password: [null, Validators.required],
  });

  currencyList = Array()


  constructor(public auth: AuthService, public userService: UserService, public currencyService: CurrencyService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.auth.userProfile$.subscribe(userAuthO => {
      if (userAuthO) {
        this.userService.getUser(userAuthO.sub).subscribe(res => {
          this.currentUser = res["user"]
          this.profileForm = this.fb.group({
            username: [this.currentUser.username, Validators.required],
            email: [this.currentUser.email, Validators.required],
            currency: [this.currentUser.user_metadata.currency, Validators.required],
            password: [null, Validators.required],
          });
          // console.log(res)
          console.log(this.objectUser())
        })
      }
    })

    this.currencyService.getCurrencies().subscribe(res => {
      for (const data in res['currencies']) {
        this.currencyList.push(data)
      }
    })
  }


  objectUser(){
    return this.profileForm.getRawValue()
  }

  submitUpdate(){
    this.userService.updateUser(this.userService.currentUser.id,this.profileForm.getRawValue())
  }


  save() {
    // call address service method
    let data = this.profileForm.value;

    console.log('data', data)
    // @ts-ignore
    if (data.username !== null){
      // @ts-ignore

      this.userService.updateUser(this.userService.currentUser.id,{username: data.username}).subscribe(res => {
         console.log('resultat update username',res)
          } )
    }
    // @ts-ignore

    else if (data.email !== null) {
      // @ts-ignore

      this.userService.updateUser(this.userService.currentUser.id,{email: data.email}).subscribe(res => {
        console.log('resultat update email',res)
      }
      )
    }
    else if (data.currency !== null) {
      // @ts-ignore

      this.userService.updateUser(this.userService.currentUser.currency,{currency: data.currency}).subscribe(res => {
        console.log('resultat update currency',res)
      } )
    }

  }

  isPasswordEntered(){
    return this.profileForm.get('password') !== undefined;
  }

  /**
  objectName() {
     return {
       name: this.profileForm.get('name')
    }
  }

  objectEmail() {
    return {
      email: this.profileForm.get('email')
    }
  }

  objectPassword() {
    return {
      password: this.profileForm.get('password')
    }
  }

  objectCurrency() {
    return {
      currency: this.profileForm.get('currency')
    }
  }
*/


  //return {
  //this.profileForm.

/**
  submitUpdate() {
    if (this.profileForm.get('name') !== null){
      this.userService.updateUser(this.userService.currentUser.id, this.profileForm.get.name).subscribe(resultat => {

        console.log('resultat update name',resultat)
      } )
    }
    else if (this.profileForm.get('email') !== null){
      this.userService.updateUser(this.userService.currentUser.email, this.profileForm.get('email')).subscribe(resultat=> {

        console.log('resultat update email', resultat)
        }
      )
      return this.objectEmail()
    }
    else if (this.profileForm.get('password') !== null){
      return this.objectPassword()
    }
    else if (this.profileForm.get('currency') !== null){
      return this.objectCurrency()
    }


    this.userService.updateUser()
  }

*/


}
