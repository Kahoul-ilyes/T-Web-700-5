import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {UserModel} from '../user.model';
import {AuthenticationService} from '../authentication.service';
import {UserService} from '../user.service';



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: UserModel;
  users = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }
}
