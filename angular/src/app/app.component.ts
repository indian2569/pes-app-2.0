import {Component, computed} from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  // derived from the token storage signals, so the toolbar updates right after login/logout without a page reload
  private roles = computed<string[]>(() => this.token.user()?.roles ?? []);
  showAdminBoard = computed(() => this.roles().includes('ROLE_ADMIN'));
  showModeratorBoard = computed(() => this.roles().includes('ROLE_MODERATOR'));

  constructor(protected token: TokenStorageService) {
  }

  logout(): void {
    this.token.signOut();
  }
}
