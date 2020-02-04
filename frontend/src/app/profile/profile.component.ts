import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../auth.service';
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  options: FormGroup;
  name= this.userService.currentUser.username;
  email= this.userService.currentUser.email;


  constructor(public auth: AuthService,public userService : UserService, fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
    this.name= this.userService.currentUser.username;
    this.email= this.userService.currentUser.email;
  }

}
