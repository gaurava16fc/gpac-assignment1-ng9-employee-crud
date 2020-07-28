import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  model: any = {};

  constructor(
      public authService: AuthService,
      private alertify: AlertifyService,
      private router: Router
    ) {}

  ngOnInit(): void {
  }

  // login() {
  //   this.authService.login(this.model).subscribe(next => {
  //     this.alertify.success('Logged-in successfully!');
  //   }, error => {
  //     console.log(error);
  //     this.alertify.error(error);
  //   }, () => {
  //     this.router.navigate(['/home']);
  //   });
  // }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isadm');
    this.alertify.message('Logged-out successfully!');
    this.router.navigate(['/signin']);
  }

}
