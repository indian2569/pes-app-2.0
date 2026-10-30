import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { EntryService } from '../../entry/entry.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EntryDTO } from '../../model/EntryDTO';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'Demo';
  content?: string;
  boxName1 = 'Nedavno pridane';
  boxName2 = 'Pridane tento mesiac';
  boxName3 = 'Vytvorene celkom';
  records: EntryDTO[] = [];

  onDestroy$ = new Subject();

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private entryService: EntryService,
              private router: Router) { }

  ngOnInit(): void {
    // the recent entries are shown (and allowed by the backend) only to logged-in users
    if (this.isLoggedIn()) {
      this.entryService.getAllEntrysByCard().pipe(takeUntil(this.onDestroy$))
      .subscribe(entrys => this.records = entrys);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  isLoggedIn (): boolean {
    return this.tokenStorageService.isAuthenticated();
  }

  redirectLoginUrl(): void {
     this.router.navigate([`/login`]);
  }

  redirectRegisterUrl(): void {
     this.router.navigate([`/register`]);
  }
}
