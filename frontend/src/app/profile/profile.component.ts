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
  // options: FormGroup;
  profileForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
  });

currentUser=null

  constructor(public auth: AuthService,public userService : UserService, private fb: FormBuilder) { }

  ngOnInit() { 
    this.auth.userProfile$.subscribe(userAuthO => {
      if (userAuthO) {
        this.userService.getUser(userAuthO.sub).subscribe(res => {
          this.currentUser= res["user"]
          console.log(res)
          console.log(this.currentUser)
        })
      }})
  }

}
