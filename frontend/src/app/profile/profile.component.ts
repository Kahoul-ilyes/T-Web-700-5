import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import {UserService} from "../user/user.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
  currentUser=null
  // options: FormGroup;
  profileForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    currency: [null, Validators.required],
    password:[null, Validators.required],
  });



  constructor(public auth: AuthService,public userService : UserService, private fb: FormBuilder) { }

  ngOnInit() { 
    this.auth.userProfile$.subscribe(userAuthO => {
      if (userAuthO) {
        this.userService.getUser(userAuthO.sub).subscribe(res => {
          this.currentUser= res["user"]
          this.profileForm=this.fb.group({
            name: [this.currentUser.name, Validators.required],
            email: [this.currentUser.email, Validators.required],
            currency: [this.currentUser.user_metadata.currency, Validators.required],
            password:[null, Validators.required],
          });
          // console.log(res)
          console.log(this.currentUser)
        })
      }})
  }

}
