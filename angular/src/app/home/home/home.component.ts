import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Demo';
  content?: string;
  boxName1 = 'Nedavno pridane';
  boxName2 = 'Pridane tento mesiac';
  boxName3 = 'Vytvorene celkom';
  records = [];

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn (): boolean {
    return !!this.tokenStorageService.getToken();
  }

  redirectLoginUrl(): void {
     this.router.navigate([`/login`]);
  }

  redirectRegisterUrl(): void {
     this.router.navigate([`/register`]);
  }
}
