import {Component, OnInit} from '@angular/core';
import { AuthService} from '../../../auth.service';
import {UserService} from '../../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, public userService: UserService) { }

  ngOnInit(): void {
  }
}
