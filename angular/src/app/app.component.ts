import {Component, OnInit} from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(protected token: TokenStorageService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.token.isAuthenticated();
    if (this.isLoggedIn) {
      const user = this.token.user();
      this.roles = user.roles;

        if (!_.isNil(this.roles)) {
            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
        } else {
            this.showAdminBoard = false;
            this.showModeratorBoard = false;
        }

      this.username = user.username;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.token.signOut();
  }
}
